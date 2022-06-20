import React, {ChangeEvent, useState} from 'react'

interface IProps {
    fileType: string;
    onChangeCallback: (value: string) => void
}

export const InputFile = React.forwardRef<HTMLInputElement, IProps>(({fileType, onChangeCallback}, ref) => {
    const [fileURL, setFileURL] = useState<string>();
    const [file, setFile] = useState<File>();
    const [fileData, setFileData] = useState<FormData>();
    //const [code, setCode] = useState(false);
    //const [base64, setBase64] = useState(true);
    const [file64, setFile64] = useState<string | ArrayBuffer | null>();
    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(); // for send to back
        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            //setFile(newFile);
            //setFileURL(window.URL.createObjectURL(newFile));
            //formData.append('myFile', newFile, newFile.name);
            //setFileData(formData);
            reader.onloadend = () => {
                setFile64(reader.result)
            }
            reader.readAsDataURL(newFile);
            console.log(file64)


           /* if (code) { // reader
                reader.onloadend = () => {
                    setFile64(reader.result);
                };
                if (base64) reader.readAsDataURL(newFile);
                else reader.readAsText(newFile);
            }*/
        }
    };
    return (
        <input
            type={'file'}
            onChange={upload}
            style={{display: 'none'}}
            ref={ref}
            accept={fileType}
        />
    )
})
