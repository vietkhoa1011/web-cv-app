# 🤖 AGENTS.md

> **Hướng dẫn làm việc cho AI Agents**  
> Dự án: **CV-AP** — Monorepo E-commerce

**Last Updated:** 11/05/2026  
**Project Status:** Early Stage (Homepage + Product Listing)

---

## 📋 Project Overview

- **Tên dự án**: CV-AP (E-commerce)
- **Kiến trúc**: Monorepo (Backend + Frontend)
- **Mục tiêu**: Xây dựng một nền tảng thương mại điện tử đầy đủ tính năng, sạch sẽ, dễ mở rộng.
- **Giai đoạn hiện tại**: Hoàn thiện trang chủ, API products + categories, pagination, filtering.

---

## 🛠️ Tech Stack

### Backend (`backend/`)
- Node.js + Express 5 (ES Modules)
- MongoDB + Mongoose 9.x
- NodeCache (middleware cache 5 phút)
- TypeScript (nên dần migrate từ JS sang TS)

### Frontend (`frontend/`)
- React 19 + TypeScript
- Vite 8
- TailwindCSS + Lucide React
- React Router DOM 7
- Path alias: `@` → `src/`

---

## 🎯 Agent Roles

### 1. **Architect Agent**
- Quyết định kiến trúc, folder structure, tech decisions
- Luôn tuân thủ Feature-Sliced Design khi mở rộng

### 2. **Backend Agent**
- Viết API, controllers, models, middleware
- Ưu tiên: Error handling tốt, response format nhất quán, caching khi phù hợp

### 3. **Frontend Agent**
- Viết components, hooks, pages bằng React + TypeScript
- Sử dụng Shadcn/ui style (clean, accessible, responsive)

### 4. **Fullstack Agent** (mặc định)
- Có thể làm cả frontend + backend khi được yêu cầu

---

## 📌 Coding Rules & Conventions

### Chung
- Luôn ưu tiên **TypeScript** (đặc biệt khi tạo file mới)
- Code phải sạch, có comment khi logic phức tạp
- Sử dụng early return, tránh nested if sâu
- Response API luôn có format: `{ success: boolean, data?: any, message?: string, pagination?: {...} }`

### Backend
- Routes đặt trong `backend/routes/`
- Controllers tách biệt
- Models dùng Mongoose schema rõ ràng
- Validate input (sẽ dùng Zod sau)
- Cache chỉ dùng cho GET requests không thay đổi thường xuyên

### Frontend
- Component theo chức năng (Feature-based)
- Hooks đặt trong `src/hooks/`
- Components chung đặt trong `src/components/`
- Pages đặt trong `src/pages/`
- Sử dụng Tailwind class, tránh inline style
- Component phải responsive (mobile-first)

### Naming Convention
- File: `kebab-case` hoặc `PascalCase` (component)
- Variable/Function: `camelCase`
- Constant: `UPPER_SNAKE_CASE`
- Interface/Type: `PascalCase`

---

## Best Prompt Templates (Sử dụng khi chat với AI)

**1. Tạo Component Frontend**
```prompt
Hãy tạo component [Tên Component] theo style hiện tại của dự án CV-AP.
Yêu cầu: TypeScript, Tailwind, responsive, clean code, có comment.