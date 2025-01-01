import axios from 'axios';

// Тип данных для ответа API
type APIResponseType = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

// Функция для получения постов длиннее 100 символов
async function fetchLongPosts(): Promise<APIResponseType[]> {
    try {
        // Выполнение GET-запроса к JSONPlaceholder API
        const response = await axios.get<APIResponseType[]>('https://jsonplaceholder.typicode.com/posts');
        
        // Фильтрация постов, длина которых больше 100 символов
        const longPosts = response.data.filter(post => post.body.length > 100);
        
        return longPosts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// Экспортируем функцию
module.exports = { fetchLongPosts };
