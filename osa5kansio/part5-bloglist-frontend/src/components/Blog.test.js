import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

describe("Blog", () => {
  const blog = {
    title: "Goto considered harmful",
    author: "Edsger Dijkstra",
    url: "google.com",
    likes: 1,
  };

  const likeHandler = jest.fn();

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        remove={jest.fn()}
        canRemove={true}
        like={likeHandler}
      />
    );
  });

  test("renders only title and author by default", () => {
    screen.getByText(blog.title, { exact: false });
    screen.getByText(blog.author, { exact: false });

    const ulrElement = screen.queryByText(blog.url, { exact: false });
    expect(ulrElement).toBeNull();

    const likesElement = screen.queryByText("likes", { exact: false });
    expect(likesElement).toBeNull();
  });

  test("renders also details when asked to be shown", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    screen.getByText(blog.url, { exact: false });
    screen.getByText(`likes ${blog.likes}`, { exact: false });
  });

  test("if liked twice, ", async () => {
    const user = userEvent.setup();

    const showButton = screen.getByText("show");
    await user.click(showButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
