import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

describe("Smoke tests", () => {
  it("renders without crashing", function() {
    render(<Carousel />);
  });
});

describe("Snapshot tests", () => {
  it("matches snapshot", function() {
    const {asFragment} = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Test carousel arrows", () => {
  it("works when you click on the right arrow", function() {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  });

  it("works when you click on the left arrow", function() {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  });

  it("removes the left arrow when on the first image", function() {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    const leftArrow = queryByTestId("left-arrow");
    
    // make sure that only the first image is showing
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

    // expect that the left arrow is not showing
    expect(leftArrow).not.toBeInTheDocument();
  });

  it("removes the right arrow when on the last image", function() {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    const rightArrow = queryByTestId("right-arrow");

    // expect the first image to show, but not the second or third
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

    // move forward twice in the carousel
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);
    
    // make sure that only the last image is showing
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();

    // expect that the right arrow is not showing
    expect(rightArrow).not.toBeInTheDocument();
  });
});
