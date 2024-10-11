import axios from "axios";
import dotenv from "dotenv";
import { dataAppmaxx } from "../interfaces/dataForAppmaxx";

dotenv.config();

const tokenProducao = process.env.APPMAX_ACESS_TOKEN_PRODUCAO as string;

const axiosInstance = axios.create({
  baseURL: "https://admin.appmax.com.br/api/v3/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Função para tratar erros
const handleError = (error: any) => {
  if (error.response) {
    console.error("Erro na resposta da API:", error.response.data);
    return { success: false, ...error.response.data };
  } else if (error.request) {
    console.error("Erro na requisição:", error.request);
    return { success: false, message: "Erro na requisição" };
  } else {
    console.error("Erro desconhecido:", error.message);
    return { success: false, message: "Erro desconhecido" };
  }
};

export const creatClientId = async (dataClient: dataAppmaxx) => {
  try {
    const response = await axiosInstance.post("customer", {
      "access-token": tokenProducao,
      firstname: dataClient.firstname,
      lastname: dataClient.lastname,
      email: dataClient.email,
      telephone: dataClient.telephone,
    });

    console.log("Tipo id cliente na requisição:", typeof response.data.data.id);
    return { success: true, clientId: response.data.data.id };
  } catch (error) {
    return handleError(error);
  }
};

export const createOrderId = async (
  clientId: number,
  total: number,
  qty: number
) => {
  try {
    const response = await axiosInstance.post("order", {
      "access-token": tokenProducao,
      total: total,
      products: [
        {
          sku: "123123",
          name: "My product 1",
          qty: qty,
        },
      ],
      customer_id: clientId,
    });

    console.log("Order id:", response.data.data.id);
    return { success: true, orderId: response.data.data.id };
  } catch (error) {
    return handleError(error);
  }
};

export const creatPayment = async (
  clienteId: number,
  orderId: number,
  document_number: string,
  expiration_data: string
) => {
  try {
    const response = await axiosInstance.post("payment/pix", {
      "access-token": tokenProducao,
      cart: {
        order_id: orderId,
      },
      customer: {
        customer_id: clienteId,
      },
      payment: {
        pix: {
          document_number: document_number,
          expiration_date: expiration_data,
        },
      },
    });

    return { success: true, paymentData: response.data };
  } catch (error) {
    console.log(`Erros em criar pagamento: ${error}`);
    return handleError(error);
  }
};
