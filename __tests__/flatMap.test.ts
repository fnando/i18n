import { flatMap } from "../src/helpers/flatMap";

describe("flatMap", () => {
  it("generates map", () => {
    const map = flatMap({
      user: {
        email: "EMAIL",
        addresses: [
          {
            description: "DESCRIPTION",
            city: "CITY",
            state: "STATE",
          },
        ],
        preferences: {
          theme: "dark",
        },
      },

      options: {
        notifications: {
          system: true,
          marketing: true,
        },
      },
    });

    expect(map).toEqual([
      "options.notifications.marketing",
      "options.notifications.system",
      "user.addresses",
      "user.email",
      "user.preferences.theme",
    ]);
  });
});
