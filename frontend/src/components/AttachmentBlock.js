import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttachmentBlock = ({ id }) => {
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        const fetchAttachments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/attachment/" + id);
                setAttachments(response.data);
            } catch (error) {
                console.error('Error fetching attachments:', error);
            }
        };
        fetchAttachments();
    }, [id]);

    return (
        <div>
            {attachments.length > 0 ? (
                attachments.map((attachment, index) => (
                    <div key={index} className='attachmentBlock'>
                        <div><i class="fa-regular fa-file"></i><i class="fa-solid fa-download"></i></div>
                        <p className='nombreArchivo'>{attachment.name}</p>
                    </div>
                ))
            ) : (
                <p>No hay archivos adjuntos.</p>
            )}
        </div>
    );
};

export default AttachmentBlock;