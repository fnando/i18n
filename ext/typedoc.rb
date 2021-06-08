# frozen_string_literal: true

require "nokogiri"
require "json"
require "pathname"

def json(file)
  JSON.parse(File.read(file), symbolize_names: true)
end

def package_json
  @package_json ||= json("#{__dir__}/../package.json")
end

def docs_dir
  @docs_dir ||= Pathname.new("#{__dir__}/../docs/v#{package_json.fetch(:version)}")
end

def fix_search
  file = docs_dir.join("assets/js/search.js")
  data = JSON.parse(file.read.gsub("window.searchData =", ""),
                    symbolize_names: true)

  data[:rows] = data[:rows].each_with_object([]) do |entry, buffer|
    skip = entry[:name].start_with?("helpers") ||
           entry[:parent]&.start_with?("helpers")
    buffer << entry unless skip
  end

  file.write("window.searchData = #{JSON.pretty_generate(data)}")
end

def remove_unwanted_files
  Dir[docs_dir.join("modules/helpers*.html")].each do |file|
    File.unlink(file)
  end
end

def fix_html
  selector = [
    ".tsd-kind-module > a[href*='modules/helpers']",
    ".tsd-kind-module > a[href*='helpers']"
  ].join(", ")

  Dir[docs_dir.join("**/*.html")].each do |file|
    html = Nokogiri(File.read(file))

    html.css(selector).each do |link|
      link.parent.remove
    end

    File.open(file, "w") do |io|
      io << html.to_s
    end
  end
end

def latest_url
  "https://fnando.github.io/i18n/v#{package_json.fetch(:version)}/"
end

def build_index
  File.open("#{__dir__}/../docs/index.html", "w") do |file|
    file << <<~HTML
      <!DOCTYPE HTML>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="refresh" content="0;url=#{latest_url}" />
          <link rel="canonical" href="#{latest_url}" />
        </head>
        <body>
          <h1>
            The page been moved to <a href="#{latest_url}">#{latest_url}</a>
          </h1>
        </body>
      </html>
    HTML
  end
end

fix_search
remove_unwanted_files
fix_html
build_index
