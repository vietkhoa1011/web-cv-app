cv-app-backend/
├── node_modules/       # Thư viện phụ thuộc
├── src/                # Mã nguồn chính
│   ├── config/         # Cấu hình DB, biến môi trường (.env)
│   ├── controllers/    # Xử lý logic nghiệp vụ (business logic)
│   ├── models/         # Định nghĩa cấu trúc dữ liệu (Mongoose/Sequelize)
│   ├── routes/         # Định nghĩa các API endpoint
│   ├── middlewares/    # Middleware kiểm tra token, validate dữ liệu
│   ├── utils/          # Các hàm hỗ trợ (helper functions)
│   └── app.js          # Khởi tạo app Express
├── .env                # Biến môi trường bảo mật
├── .gitignore          # File bỏ qua khi push lên git
├── package.json        # Quản lý thư viện và script
└── server.js           # Điểm khởi chạy ứng dụng (Entry point)
