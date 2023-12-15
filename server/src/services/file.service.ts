import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';

class FileService {

    async readFile(filePath: string): Promise<string> {
        return new Promise((res, rej) => {
            fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                if(err) return rej(err);
                res(data);
            })
        });
    }

    async readMail(mailName: string, data?: {[key: string]: string}) {
        const mailPath = path.resolve(__dirname, '..', 'mails', mailName);
        const file = await this.readFile(mailPath);

        if(data && Object.keys(data).length) {
            const regex = /\{\-\-(.*?)\-\-\}/g;

            const replacedHtml = file.replace(regex, (match, placeholder) => {
                return data.hasOwnProperty(placeholder) ? data[placeholder] : match;
            });

            return replacedHtml;
        }

        return file;
    }

    async removeAvatar(avatarName: string): Promise<string> {
        return new Promise((res, rej) => {
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'avatars', avatarName);
            if(fs.existsSync(filePath)) {
                fs.rm(filePath, (err) => {
                    if(err) {
                        return rej(err);
                    }
                    return res(filePath);
                })
            } else {
                return res(filePath);
            }
        })
    }

    async uploadAvatar(avatar: UploadedFile): Promise<string> {
        const { name, mv } = avatar;

        const fileName = `${v4()}${path.extname(name)}`;
        const filePath = path.resolve(__dirname, '..', '..', 'static', 'avatars', fileName);
        const dirPath = path.dirname(filePath);

        await this.makeDir(dirPath);
        mv(filePath);

        return fileName;
    }

    async makeDir(dirName: string): Promise<string> {
        return new Promise((res, rej) => {
            if(!fs.existsSync(dirName)) {
                fs.mkdir(dirName, {recursive: true}, (err) => {
                    if(err) {
                        return rej(err);
                    }
                    return res(dirName);
                })
            } else {
                return res(dirName);
            }
        });
    }

    async uploadFile(file: UploadedFile): Promise<string> {
        const { mimetype, name, mv } = file;

        let type = mimetype.split('/').shift();
        if(type !== 'video' && type !== 'image') type = 'document';

        const fileName = `${v4()}${path.extname(name)}`;
        const filePath = path.resolve(__dirname, '..', '..', 'static', type, fileName);
        const dirPath = path.dirname(filePath);

        await this.makeDir(dirPath);

        mv(filePath);

        return fileName;
    }

    async removeFile(type: string, name: string): Promise<string> {
        return new Promise((res, rej) => {
            const filePath = path.resolve(__dirname, '..', '..', 'static', type, name);
            fs.rm(filePath, (err) => {
                if(err) return rej(err);
                return res(filePath);
            })
        });
    }
}

export default new FileService();