import mongoose, { Schema, Document } from 'mongoose';

// Тип для пользователя
type User = {
    name: string;
    email: string;
};

// Тип для дублированных пользователей
type DuplicatedUsers = {
    email: string;
}

// Подключение к базе данных MongoDB
const connectDB = async () => {
    try {
        // Подключение к MongoDB (без старых параметров, которые больше не нужны)
        await mongoose.connect('mongodb://localhost:27017/usersdb');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

// Схема пользователя
const userSchema = new Schema<User & Document>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// Модель пользователя
const UserModel = mongoose.model<User & Document>('User', userSchema);

// Функция для работы с пользователями
async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        // Подключаемся к базе данных
        await connectDB();

        // Добавление пользователей
        const users = [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Charlie', email: 'charlie@example.com' },
            { name: 'Alice Duplicate', email: 'alice@example.com' }, // Дубликат
        ];

        // Добавляем пользователей в базу данных
        for (const user of users) {
            try {
                await new UserModel(user).save();
            } catch (error) {
                console.error(`Error adding user ${user.email}:`, error);
            }
        }

        // Находим дубликаты по email
        const duplicates = await UserModel.aggregate([
            { $group: { _id: "$email", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } },
            { $project: { email: "$_id", _id: 0 } }
        ]);

        // Возвращаем список дублированных пользователей
        return duplicates;

    } catch (error) {
        console.error('Error managing users:', error);
        return [];
    } finally {
        // Закрываем соединение с базой данных
        mongoose.connection.close();
    }
}

// Экспортируем функцию
module.exports = { manageUsers };
