import { google } from 'googleapis';

export const getProducts = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const googleSheets = google.sheets({ version: "v4", auth: auth });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'Products!A2:H',
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
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const googleSheets = google.sheets({ version: "v4", auth: auth });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `Products!A${(pageNo - 1) * limit + 2}:H${pageNo * limit + 1}`,
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

export const newLead = async (payload) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const googleSheets = google.sheets({ version: "v4", auth: auth });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: 'Leads!A:C',
            valueInputOption: 'RAW',
            requestBody: {
                values: [
                    [payload.name, payload.contact, payload.phone]
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

export const getBestSellingProducts = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const googleSheets = google.sheets({ version: "v4", auth: auth });
    const spreadsheetId = process.env.SPREADSHEET_ID ?? "";

    try {
        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'BestSellingProducts!A2:D',
        });
        const result = response.data;
        return result.values;
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        return err;
    }
}