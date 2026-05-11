# Hướng dẫn AI Agent — CV-AP

## Tổng quan dự án

`cv-ap` là một monorepo thương mại điện tử gồm hai service chính:

- Backend: Express.js (Node) + MongoDB
- Frontend: React + TypeScript + Vite

## Lệnh nhanh để bắt đầu

### Backend
```bash
cd backend
npm install
npm run dev    # dev với nodemon
npm start      # production
```

Server mặc định chạy trên http://localhost:5000 (cấu hình bằng `.env` PORT)

### Frontend
```bash
cd frontend
npm install
npm run dev
npm run build
npm lint
npm run preview
```

Dev server mặc định: http://localhost:5173

## Kiến trúc & cấu trúc thư mục

Frontend (chung):

```
src/
  pages/        # các trang (Home, About, Projects...)
  components/   # components tái sử dụng
    layout/     # header, footer, navbar
  services/     # gọi API
  types/        # interface/typedefs
  hooks/        # Custom hooks
  App.tsx
  main.tsx
```

Backend:

```
server.js       # express app, route mount
models/         # Mongoose schemas
routes/         # route handlers
```

## Biên dịch nhanh các quy ước

- TypeScript: frontend dùng strict mode (xem `tsconfig.json`)
- API: tất cả gọi API nên qua `src/services/` để dễ mock/test
- Types: khai báo interfaces chung trong `src/types/`
- Hooks: Custom hooks
- Styling: ưu tiên CSS mô-đun hoặc Tailwind; hiện tại có một số inline styles

## Các biến môi trường cần biết

- `MONGO_URI` — chuỗi kết nối MongoDB
- `PORT` — cổng server (mặc định 5000)

## Quy trình phát triển

1. Mở hai terminal:

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

2. Frontend: Vite HMR tự reload khi thay đổi
3. Backend: nodemon tự restart khi thay đổi
4. Trước khi commit: chạy `npm run lint` (frontend)

## Nhiệm vụ thường gặp

- Thêm trang mới: tạo component trong `src/pages/` và đăng ký route trong `App.tsx`
- Thêm dịch vụ API: thêm hàm vào `src/services/api.ts` và type vào `src/types/`
- Thêm route backend: mở rộng `routes/` và mount vào `server.js`
- Thêm model: tạo schema trong `models/`

## Ghi chú nhanh

- Thư mục `services/` và `types/` được để trống sẵn sàng mở rộng
- Cần `.env` có `MONGO_URI` để kết nối DB khi chạy backend
- Build frontend xuất ra `dist/`

---

Nếu bạn muốn tôi điều chỉnh ngôn ngữ (Tiếng Anh/Tiếng Việt), cấp độ chi tiết, hoặc thêm ví dụ lệnh cụ thể, cho biết yêu cầu để tôi cập nhật.
