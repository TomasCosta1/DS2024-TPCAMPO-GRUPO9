import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentBlock = ({ id }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/comment/" + id);
                setComments(response.data);
                const commentsWithNames = await Promise.all(response.data.map(async (comment) => {
                    const senderName = await fetchName(comment.user_id);
                    return { ...comment, senderName };
                }));
                setComments(commentsWithNames);
            } catch (error) {
                console.error('Error al buscar los comentarios:', error);
            }
        };
        fetchComments();
    }, [id]);


    const fetchName = async (id) => {
        try {
            const response = await axios.get("http://localhost:3000/user/" + id);
            let fullname = response.data[0].name + ' ' + response.data[0].lastname;
            console.log(fullname);
            return fullname;
        } catch (error) {
            console.error('Error al buscar el nombre del usuario:', error);
        }
    }

    return (
        <div>
            <table className='tableComment'>
                <thead>
                    <tr>
                        <th>Emisor</th>
                        <th>Asunto</th>
                        <th>Descripción</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                            <td>{comment.senderName}</td>
                            <td>{comment.subject}</td>
                            <td>{comment.description}</td>
                            <td>{new Date(new Date(comment.dateTime).getTime() - 3 * 60 * 60 * 1000).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</td>
                        </tr>
                    ))}
                    {comments.length === 0 && (
                        <tr>
                            <td colSpan="4">No hay comentarios disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CommentBlock;