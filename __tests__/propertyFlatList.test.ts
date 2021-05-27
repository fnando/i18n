import { propertyFlatList } from "../src/helpers/propertyFlatList";

describe("propertyFlatList", () => {
  it("generates list", () => {
    const map = propertyFlatList({
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
