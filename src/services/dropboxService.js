import { Dropbox } from 'dropbox';

// Credentials for local testing
const APP_KEY = '3b2fltt1sr1ih89';
const APP_SECRET = '3run92qh2bhdgtm';
const REFRESH_TOKEN = 'PGPISHoapIsAAAAAAAAAAc_Fy6Pu8zr7yMo73Tn19C_5Kg4606qv3BbGzulByGWE';

// Initialize Dropbox client
// Note: In a real production app, secrets should not be exposed on the client side.
// This is for local testing as requested.
const dbx = new Dropbox({
    clientId: APP_KEY,
    clientSecret: APP_SECRET,
    refreshToken: REFRESH_TOKEN,
});

export const listImagesFromDropbox = async () => {
    try {
        const response = await dbx.filesListFolder({ path: '' }); // List root or specific folder
        const files = response.result.entries
            .filter(entry => entry['.tag'] === 'file' && (entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.jpeg')));

        // Get temporary links for images to display them
        const imagesWithLinks = await Promise.all(files.map(async (file) => {
            // For display, we need a link. 
            // filesGetTemporaryLink is good for short term, creates a link valid for 4 hours.
            // sharedLinks is another option but let's use temp links for simplicity in session.
            try {
                const linkResponse = await dbx.filesGetTemporaryLink({ path: file.path_lower });
                return {
                    id: file.id,
                    name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension for display
                    url: linkResponse.result.link,
                    path: file.path_lower
                };
            } catch (e) {
                console.error('Error getting link for', file.name, e);
                return null;
            }
        }));

        return imagesWithLinks.filter(img => img !== null);
    } catch (error) {
        console.error('Error listing images from Dropbox:', error);
        return [];
    }
};

export const uploadImageToDropbox = async (file, name) => {
    try {
        const validName = name.replace(/[^a-zA-Z0-9 _-]/g, '').trim(); // Sanitize name
        const extension = file.name.split('.').pop();
        const fileName = `${validName}.${extension}`;
        const path = `/${fileName}`;

        const response = await dbx.filesUpload({
            path: path,
            contents: file,
            mode: { '.tag': 'add' }, // Avoid overwriting if possible, or use 'overwrite'
            autorename: true
        });

        // Get the link immediately for display
        const linkResponse = await dbx.filesGetTemporaryLink({ path: response.result.path_lower });

        return {
            id: response.result.id,
            name: response.result.name.replace(/\.[^/.]+$/, ""),
            url: linkResponse.result.link,
            path: response.result.path_lower
        };
    } catch (error) {
        console.error('Error uploading to Dropbox:', error);
        throw error;
    }
};

export const deleteImageFromDropbox = async (id) => {
    // We need the path to delete. Since ID is unique but API uses path mostly,
    // we might need to find the path first or store it. 
    // In listImages, we stored 'path' in the object. 
    // Wait, the UI passes 'id'. We need to make sure the delete function receives the path or looks it up.
    // Actually, 'deleteV2' accepts a path, which can be the ID format 'id:...'
    try {
        await dbx.filesDeleteV2({ path: id });
    } catch (error) {
        console.error('Error deleting from Dropbox:', error);
        throw error;
    }
};
