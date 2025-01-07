import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/vue";
import router from "../../router";
import AppMenuNav from "../AppMenuNav.vue";

afterEach(cleanup);

test("Display component", () => {
  render(AppMenuNav, {
    global: {
      plugins: [router],
    },
  });

  const menuitems = screen.getAllByRole("menuitem");

  expect(menuitems).toHaveLength(3);
});

test("When home is displayed, the link to home is not displayed", async () => {
  router.push("/");

  await router.isReady();

  render(AppMenuNav, {
    global: {
      plugins: [router],
    },
  });

  expect(screen.queryByRole("menuitem", {
    name: "Return app",
  })).not.toBeInTheDocument();
});

test("The link to home is displayed when other than home is displayed", async () => {
  router.push("/about");

  await router.isReady();

  render(AppMenuNav, {
    global: {
      plugins: [router],
    },
  });

  expect(screen.queryByRole("menuitem", {
    name: "Return app",
  })).toBeInTheDocument();
});
