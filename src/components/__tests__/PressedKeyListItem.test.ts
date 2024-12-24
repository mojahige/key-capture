import { test, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import PressedKeyListItem from "../PressedKeyListItem.vue";

test("display pressedKey", () => {
  render(PressedKeyListItem, {
    props: {
      pressedKey: "f",
    },
  });

  expect(screen.getByText("f", {
    selector: "ins > code",
  })).toBeInTheDocument();
});
