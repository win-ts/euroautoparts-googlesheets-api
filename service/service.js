import { google } from 'googleapis';
import * as utils from '../utils/utils.js';

export const getProducts = async () => {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: authClient });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'Products!A2:I',
        });
        const result = response.data;
        return result.values;
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByPage = async (limit, pageNo) => {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const googleSheets = google.sheets({ version: "v4", auth: auth });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `Products!A${(pageNo - 1) * limit + 2}:I${pageNo * limit + 1}`,
        });
        const result = response.data;
        return result.values;
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsPageCount = async (limit) => {
    try {
        const result = await getProducts();
        return Math.ceil(result.length / limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByType = async (category) => {
    try {
        const result = await getProducts();
        return result.filter((product) => product[1] === category);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypePageCount = async (category, limit) => {
    try {
        const result = await getProductsByType(category);
        return Math.ceil(result.length / limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeWithPage = async (category, limit, pageNo) => {
    try {
        const result = await getProductsByType(category); 
        return result.slice((pageNo - 1) * limit, pageNo * limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByBrand = async (brand) => {
    try {
        const result = await getProducts();
        return result.filter((product) => product[2].includes(brand));
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByBrandPageCount = async (brand, limit) => {
    try {
        const result = await getProductsByBrand(brand);
        return Math.ceil(result.length / limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByBrandWithPage = async (brand, limit, pageNo) => {
    try {
        const result = await getProductsByBrand(brand);
        return result.slice((pageNo - 1) * limit, pageNo * limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByCar = async (car) => {
    try {
        const result = await getProducts();
        return result.filter((product) => product[3].includes(car));
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByCarPageCount = async (car, limit) => {
    try {
        const result = await getProductsByCar(car);
        return Math.ceil(result.length / limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByCarWithPage = async (car, limit, pageNo) => {
    try {
        const result = await getProductsByCar(car);
        return result.slice((pageNo - 1) * limit, pageNo * limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeAndBrand = async (category, brand) => {
    try {
        const result = await getProductsByType(category);
        return result.filter((product) => product[2].includes(brand));
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeAndBrandPageCount = async (category, brand, limit) => {
    try {
        const result = await getProductsByTypeAndBrand(category, brand);
        return Math.ceil(result.length / limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeAndBrandWithPage = async (category, brand, limit, pageNo) => {
    try {
        const result = await getProductsByTypeAndBrand(category, brand);
        return result.slice((pageNo - 1) * limit, pageNo * limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeAndCar = async (category, car) => {
    try {
        const result = await getProductsByType(category);
        return result.filter((product) => product[3].includes(car));
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeAndCarPageCount = async (category, car, limit) => {
    try {
        const result = await getProductsByTypeAndCar(category, car);
        return Math.ceil(result.length / limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const getProductsByTypeAndCarWithPage = async (category, car, limit, pageNo) => {
    try {
        const result = await getProductsByTypeAndCar(category, car);
        return result.slice((pageNo - 1) * limit, pageNo * limit);
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}

export const newLead = async (payload) => {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const googleSheets = google.sheets({ version: "v4", auth: auth });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: 'Leads!A:E',
            valueInputOption: 'RAW',
            requestBody: {
                values: [
                    [payload.name, payload.contact, payload.phone, payload.province, utils.getThailandTime()]
                ]
            },
            includeValuesInResponse: true,
        });
        const result = response.data;
        return result;
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}