import Folder from '../../types/Folder';
import File from '../../types/File';


class MarkdownConverter {
    static convert(folders: Folder[], files: File[]): string {
        let result = '';

        // Ajouter les dossiers avec leur indentation
        folders.forEach((folder) => {
            result += `${' '.repeat(folder.indentation * 4)}├───${folder.name}\n`;
        });

        // Ajouter les fichiers avec leur indentation
        files.forEach((file) => {
            result += `${' '.repeat(file.indentation * 4)}├───${file.name}.${file.extension}\n`;
        });

        return result;
    }
}

export default MarkdownConverter;

