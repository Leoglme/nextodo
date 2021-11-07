import React from "react";
import {cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import {renderMockStore} from "./Mock";
import TodoForm from "../components/Forms/TodoForm";

afterEach(cleanup);

describe('TodoForm Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<TodoForm/>);
    });
    it("if buttonText default props value work", () => {
        const {container} = renderMockStore(<TodoForm/>);
        expect(container.getElementsByTagName('button')[0].children[0].innerHTML)
            .toEqual("Ajouter une tâche")
    });
    it("if buttonText props value work", () => {
        const {container} = renderMockStore(<TodoForm buttonText={"testing"}/>);
        expect(container.getElementsByTagName('button')[0].children[0].innerHTML)
            .toEqual("testing")
    });
})
