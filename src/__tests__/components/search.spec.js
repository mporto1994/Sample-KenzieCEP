import React from "react";
import {render , fireEvent, waitFor, screen} from "@testing-library/react"

import Search from "../../components/Search"

import { Cep } from "semantic-ui-react";

import api from '../../services';
import MockAdapter from 'axios-mock-adapter';


const apiMock = new MockAdapter(api);

describe("Search Component", ()=> {
    test("Should write on input", ()=>{
        render(<Search/>)

        expect(screen.getByPlaceholderText("Insira o CEP")).toBeTruthy()
    })
    test("Should work the button", ()=>{
        render(<Search/>)

        expect(screen.getAllByRole("button")).toBeTruthy()
    })
    
})
