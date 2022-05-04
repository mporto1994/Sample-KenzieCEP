import React from "react";
import {render , fireEvent, waitFor, screen} from "@testing-library/react";

import Search from "../components/Search";
import { Cep } from "semantic-ui-react";
import api from '../services';
import MockAdapter from 'axios-mock-adapter';
import App from "../App";
import Providers from "../providers/index";


const apiMock = new MockAdapter(api);

describe("Search Component", ()=> {
    test("Should search the CEP by the input", async ()=>{
        apiMock.onGet("88020400").replyOnce(200, {
            "bairro": "Centro",
            "cidade": "Florianópolis",
            "logradouro": "Rua Major Costa",
            "estado_info": {
                "area_km2": "95.737,895",
                "codigo_ibge": "42",
                "nome": "Santa Catarina"
            },
            "cep": "88020400",
            "cidade_info": {
                "area_km2": "675,409",
                "codigo_ibge": "4205407"
            },
            "estado": "SC"
        });
        render(<Providers>
                 <App />
               </Providers>)
        const inputField =screen.getByPlaceholderText("Insira o CEP")
        const buttonField =screen.getByRole("button")

        fireEvent.change(inputField, {target: {value:"88020400"}})
        fireEvent.click(buttonField)

        await waitFor(() => {
			expect(screen.getByDisplayValue("Rua Major Costa")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Florianópolis")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Centro")).toBeInTheDocument();
            expect(screen.getByDisplayValue("SC")).toBeInTheDocument();

		})
        
    })
})
