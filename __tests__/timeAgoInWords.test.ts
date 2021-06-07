import { I18n } from "../src/I18n";
import { DateTime } from "../index.d";
import en from "../json/en.json";
import { parseDate } from "../src/helpers";

const seconds = 1000;
const minute = 60 * 1000;
const minutes = minute;
const hours = 3600 * 1000;
const day = 86_400 * 1000;
const days = day;
const months = 2_629_746 * 1000;
const year = 31_536_000 * 1000;
const years = year;

const assertDistanceOfTimeInWords = (
  from: DateTime,
  to: DateTime = from,
  i18n = new I18n({ ...en }),
) => {
  from = parseDate(from).getTime() as number;
  to = parseDate(to).getTime() as number;

  // 0..1 minute with :include_seconds => true
  expect(i18n.timeAgoInWords(from, to, { includeSeconds: true })).toEqual(
    "less than 5 seconds",
  );

  expect(
    i18n.timeAgoInWords(from, to + 4 * seconds, { includeSeconds: true }),
  ).toEqual("less than 5 seconds");

  expect(
    i18n.timeAgoInWords(from, to + 5 * seconds, { includeSeconds: true }),
  ).toEqual("less than 10 seconds");

  expect(
    i18n.timeAgoInWords(from, to + 9 * seconds, { includeSeconds: true }),
  ).toEqual("less than 10 seconds");

  expect(
    i18n.timeAgoInWords(from, to + 10 * seconds, { includeSeconds: true }),
  ).toEqual("less than 20 seconds");

  expect(
    i18n.timeAgoInWords(from, to + 19 * seconds, { includeSeconds: true }),
  ).toEqual("less than 20 seconds");

  expect(
    i18n.timeAgoInWords(from, to + 20 * seconds, { includeSeconds: true }),
  ).toEqual("half a minute");

  expect(
    i18n.timeAgoInWords(from, to + 39 * seconds, { includeSeconds: true }),
  ).toEqual("half a minute");

  expect(
    i18n.timeAgoInWords(from, to + 40 * seconds, { includeSeconds: true }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 59 * seconds, { includeSeconds: true }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 60 * seconds, { includeSeconds: true }),
  ).toEqual("1 minute");

  expect(
    i18n.timeAgoInWords(from, to + 89 * seconds, { includeSeconds: true }),
  ).toEqual("1 minute");

  // 0..1 minute with :include_seconds => false
  expect(
    i18n.timeAgoInWords(from, to + 0 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 4 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 5 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 9 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 10 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 19 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 20 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 29 * seconds, { includeSeconds: false }),
  ).toEqual("less than a minute");

  expect(
    i18n.timeAgoInWords(from, to + 39 * seconds, { includeSeconds: false }),
  ).toEqual("1 minute");

  expect(
    i18n.timeAgoInWords(from, to + 40 * seconds, { includeSeconds: false }),
  ).toEqual("1 minute");

  expect(
    i18n.timeAgoInWords(from, to + 59 * seconds, { includeSeconds: false }),
  ).toEqual("1 minute");

  expect(
    i18n.timeAgoInWords(from, to + 60 * seconds, { includeSeconds: false }),
  ).toEqual("1 minute");

  expect(
    i18n.timeAgoInWords(from, to + 89 * seconds, { includeSeconds: false }),
  ).toEqual("1 minute");

  // Note that we are including a 30-second boundary around the interval we
  // want to test. For instance, "1 minute" is actually 30s to 1m29s. The
  // reason for doing this is simple -- in `distance_of_time_to_words`, when we
  // take the distance between our two Time objects in seconds and convert it
  // to minutes, we round the number. So 29s gets rounded down to 0m, 30s gets
  // rounded up to 1m, and 1m29s gets rounded down to 1m. A similar thing
  // happens with the other cases.

  // First case 0..1 minute
  expect(i18n.timeAgoInWords(from, to + 0 * seconds)).toEqual(
    "less than a minute",
  );

  expect(i18n.timeAgoInWords(from, to + 29 * seconds)).toEqual(
    "less than a minute",
  );

  expect(i18n.timeAgoInWords(from, to + 30 * seconds)).toEqual("1 minute");

  expect(i18n.timeAgoInWords(from, to + 1 * minute + 29 * seconds)).toEqual(
    "1 minute",
  );

  // 2 minutes up to 45 minutes
  expect(i18n.timeAgoInWords(from, to + 1 * minute + 30 * seconds)).toEqual(
    "2 minutes",
  );

  expect(i18n.timeAgoInWords(from, to + 44 * minutes + 29 * seconds)).toEqual(
    "44 minutes",
  );

  // 45 minutes up to 90 minutes
  expect(i18n.timeAgoInWords(from, to + 44 * minutes + 30 * seconds)).toEqual(
    "about 1 hour",
  );

  expect(i18n.timeAgoInWords(from, to + 89 * minutes + 29 * seconds)).toEqual(
    "about 1 hour",
  );

  // 90 minutes up to 24 hours
  expect(i18n.timeAgoInWords(from, to + 89 * minutes + 30 * seconds)).toEqual(
    "about 2 hours",
  );

  expect(
    i18n.timeAgoInWords(from, to + 23 * hours + 59 * minutes + 29 * seconds),
  ).toEqual("about 24 hours");

  // 24 hours up to 42 hours
  expect(
    i18n.timeAgoInWords(from, to + 23 * hours + 59 * minutes + 30 * seconds),
  ).toEqual("1 day");

  expect(
    i18n.timeAgoInWords(from, to + 41 * hours + 59 * minutes + 29 * seconds),
  ).toEqual("1 day");

  // 42 hours up to 30 days
  expect(
    i18n.timeAgoInWords(from, to + 41 * hours + 59 * minutes + 30 * seconds),
  ).toEqual("2 days");

  expect(i18n.timeAgoInWords(from, to + 2 * days + 12 * hours)).toEqual(
    "3 days",
  );

  expect(
    i18n.timeAgoInWords(
      from,
      to + 29 * days + 23 * hours + 59 * minutes + 29 * seconds,
    ),
  ).toEqual("30 days");

  // 30 days up to 60 days
  expect(
    i18n.timeAgoInWords(
      from,
      to + 29 * days + 23 * hours + 59 * minutes + 30 * seconds,
    ),
  ).toEqual("about 1 month");

  expect(
    i18n.timeAgoInWords(
      from,
      to + 44 * days + 23 * hours + 59 * minutes + 29 * seconds,
    ),
  ).toEqual("about 1 month");

  expect(
    i18n.timeAgoInWords(
      from,
      to + 44 * days + 23 * hours + 59 * minutes + 30 * seconds,
    ),
  ).toEqual("about 2 months");

  expect(
    i18n.timeAgoInWords(
      from,
      to + 59 * days + 23 * hours + 59 * minutes + 29 * seconds,
    ),
  ).toEqual("about 2 months");

  // 60 days up to 365 days
  expect(
    i18n.timeAgoInWords(
      from,
      to + 59 * days + 23 * hours + 59 * minutes + 30 * seconds,
    ),
  ).toEqual("2 months");

  expect(to + 1 * year - 31 * seconds).toEqual(1_118_094_269 * 1000);

  expect(i18n.timeAgoInWords(from, to + 1 * year - 31 * seconds)).toEqual(
    "12 months",
  );

  // >= 365 days
  expect(i18n.timeAgoInWords(from, to + 1 * year - 30 * seconds)).toEqual(
    "about 1 year",
  );

  expect(
    i18n.timeAgoInWords(from, to + 1 * year + 3 * months - 1 * day),
  ).toEqual("about 1 year");

  expect(i18n.timeAgoInWords(from, to + 1 * year + 6 * months)).toEqual(
    "over 1 year",
  );

  expect(
    i18n.timeAgoInWords(from, to + 2 * years - 3 * months + 1 * day),
  ).toEqual("almost 2 years");

  expect(
    i18n.timeAgoInWords(from, to + 2 * years + 3 * months - 1 * day),
  ).toEqual("about 2 years");

  expect(
    i18n.timeAgoInWords(from, to + 2 * years + 3 * months + 1 * day),
  ).toEqual("over 2 years");

  expect(
    i18n.timeAgoInWords(from, to + 2 * years + 9 * months - 1 * day),
  ).toEqual("over 2 years");

  expect(
    i18n.timeAgoInWords(from, to + 2 * years + 9 * months + 1 * day),
  ).toEqual("almost 3 years");

  expect(
    i18n.timeAgoInWords(from, to + 5 * years - 3 * months + 1 * day),
  ).toEqual("almost 5 years");

  expect(
    i18n.timeAgoInWords(from, to + 5 * years + 3 * months - 1 * day),
  ).toEqual("about 5 years");

  expect(
    i18n.timeAgoInWords(from, to + 5 * years + 3 * months + 1 * day),
  ).toEqual("over 5 years");

  expect(
    i18n.timeAgoInWords(from, to + 5 * years + 9 * months - 1 * day),
  ).toEqual("over 5 years");

  expect(
    i18n.timeAgoInWords(from, to + 5 * years + 9 * months + 1 * day),
  ).toEqual("almost 6 years");

  // Rails returns "almost 10 years" due to how year is calculated using the
  // length of a gregorian year (365.2425 days).
  expect(
    i18n.timeAgoInWords(from, to + 10 * years - 3 * months + 1 * day),
  ).toEqual("over 9 years");

  expect(
    i18n.timeAgoInWords(from, to + 10 * years + 3 * months - 1 * day),
  ).toEqual("about 10 years");

  // Rails returns "over 10 years". Same thing.
  expect(
    i18n.timeAgoInWords(from, to + 10 * years + 3 * months + 1 * day),
  ).toEqual("about 10 years");

  expect(
    i18n.timeAgoInWords(from, to + 10 * years + 9 * months - 1 * day),
  ).toEqual("over 10 years");

  // Rails returns "almost 11 years".
  expect(
    i18n.timeAgoInWords(from, to + 10 * years + 9 * months + 1 * day),
  ).toEqual("over 10 years");

  // test to < from
  expect(i18n.timeAgoInWords(from + 4 * hours, to)).toEqual("about 4 hours");

  expect(
    i18n.timeAgoInWords(from + 19 * seconds, to, { includeSeconds: true }),
  ).toEqual("less than 20 seconds");

  expect(
    i18n.timeAgoInWords(from + 19 * seconds, to, { includeSeconds: false }),
  ).toEqual("less than a minute");
};

// eslint-disable-next-line jest/expect-expect
test("time ago in words", () => {
  const from = new Date(Date.UTC(2004, 5, 6, 21, 45, 0));
  assertDistanceOfTimeInWords(from);
});
