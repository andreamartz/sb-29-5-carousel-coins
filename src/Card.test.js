import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

describe("Smoke tests", () => {
  it("renders without crashing", function() {
    render(<Card />);
  });
});

describe("Snapshot tests", () => {
  it("matches snapshot", function() {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
});