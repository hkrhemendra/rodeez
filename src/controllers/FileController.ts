import { AppDataSource } from "../data-source";
import * as multer from 'multer';

export class FileController{

    static async upload(req, res, next){
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const docsExtensionArray = ['pdf', 'docx', 'doc']
        const imageExtensionArray = ['png', 'jpeg', 'jpg']
        
        const fileExtension = file.filename.split('.').pop()
        let link:string;

        link = `${req.protocol}://${req.get('host')}/ftp/${file.filename}`;

        res.json({ link });
    }

}