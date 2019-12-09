#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"
require "yaml"
require "json"

def nuke_dir(path)
  FileUtils.rm_rf path
  FileUtils.mkdir_p path
end

nuke_dir "./tmp"
nuke_dir "./json"

system "wget -q -O tmp/master.zip https://github.com/svenfuchs/rails-i18n/archive/master.zip"
system "cd tmp && unzip master.zip > /dev/null"

Dir["./tmp/rails-i18n-master/rails/locale/**/*.yml"].each do |yml_path|
  translations = YAML.load_file(yml_path)
  file_name = File.basename(yml_path, ".yml")

  locale = translations.keys.first

  translations[locale].delete("activerecord")
  translations[locale].delete("errors")
  translations[locale].delete("helpers")
  translations[locale]["datetime"].delete("prompts")

  File.open("./json/#{file_name}.json", "w") do |io|
    io << JSON.pretty_generate(translations)
  end
end
