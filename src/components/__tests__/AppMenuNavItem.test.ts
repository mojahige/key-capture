import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/vue";
import router from "../../router";
import AppMenuNavItem from "../AppMenuNavItem.vue";

afterEach(cleanup);

test("Display component", () => {
  render(AppMenuNavItem, {
    global: {
      plugins: [router],
    },
    props: {
      to: "/",
    },
    slots: {
      default: "Home",
    },
  });

  expect(screen.getByRole("menuitem", {
    name: "Home",
  })).toBeInTheDocument();
});

test("Rendered as anchor element", () => {
  render(AppMenuNavItem, {
    global: {
      plugins: [router],
    },
    props: {
      to: "/",
    },
    slots: {
      default: "Home",
    },
  });

  const menuitem = screen.getByRole("menuitem", {
    name: "Home",
  });

  expect(menuitem.tagName).toBe("A");
  expect(menuitem).toHaveAttribute("href", "/");
});
