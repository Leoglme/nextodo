import React from "react";
import { render, cleanup, fireEvent, waitFor, screen} from "@testing-library/react";
import LoadingScreen from "../components/Common/Loading";
import '@testing-library/jest-dom'

afterEach(cleanup);
describe('Loading Components Tests', () => {
    it("renders", () => {
        const { asFragment } = render(<LoadingScreen loading={true} />);
    });

    it("so false, to the right class", () => {
        const { container  } = render(<LoadingScreen loading={false} />);
        expect(container.getElementsByClassName('body_loading-none').length).toBe(1);
    });
    it("so true, to the right class", () => {
        const { container  } = render(<LoadingScreen loading={true} />);
        expect(container.getElementsByClassName('body_loading').length).toBe(1);
    });
})
