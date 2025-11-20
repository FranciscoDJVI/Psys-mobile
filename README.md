# 📦 PSYS-APP - Sistema de Gestión de Productos y Stock

**PSYS-APP** es una aplicación móvil multiplataforma desarrollada con **React Native** y **Expo** para la gestión integral de productos, inventario y ventas. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos, visualizar el stock disponible y gestionar ventas de manera eficiente.

---

## 🚀 Características Principales

- ✅ **Gestión de Productos**: Agregar, editar, eliminar y visualizar productos con información detallada
- 📊 **Control de Stock**: Monitoreo en tiempo real del inventario disponible
- 🛒 **Módulo de Ventas**: Sistema para registrar y gestionar ventas
- 📱 **Multiplataforma**: Compatible con Android, iOS y Web
- 🎨 **Interfaz Intuitiva**: Navegación por pestañas con iconos descriptivos
- 🔄 **API REST**: Integración con backend mediante Axios
- ⚡ **Rendimiento Optimizado**: Uso de React Native Reanimated y Worklets

---

## 🛠️ Tecnologías Utilizadas

### **Framework y Lenguajes**
- **React Native** `0.81.5` - Framework para desarrollo móvil
- **React** `19.1.0` - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** `5.9.2` - Superset tipado de JavaScript
- **Expo SDK** `~54.0.23` - Plataforma para desarrollo universal

### **Navegación y Routing**
- **Expo Router** `~6.0.14` - Sistema de navegación basado en archivos
- **React Navigation** `7.1.8` - Navegación nativa para React Native
- **Bottom Tabs** `7.4.0` - Navegación por pestañas

### **UI y Animaciones**
- **React Native Reanimated** `~4.1.1` - Animaciones de alto rendimiento
- **React Native Gesture Handler** `~2.28.0` - Gestos nativos
- **Expo Haptics** `~15.0.7` - Retroalimentación háptica
- **FontAwesome Icons** - Iconografía mediante `@expo/vector-icons` y `@fortawesome`

### **HTTP y Comunicación**
- **Axios** `1.13.2` - Cliente HTTP para peticiones a la API
- **API REST** - Comunicación con backend en `http://10.0.2.2:8000/api/v1.0/`

### **Herramientas de Desarrollo**
- **ESLint** `9.25.0` - Linter para código JavaScript/TypeScript
- **Expo Dev Tools** - Herramientas de desarrollo y debugging

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** o **yarn** - Gestor de paquetes
- **Expo CLI** - Se instalará automáticamente con el proyecto
- **Android Studio** (para emulador Android) o **Xcode** (para simulador iOS)
- **Backend API** corriendo en `http://10.0.2.2:8000/api/v1.0/` (para Android Emulator)

> **Nota**: La dirección `10.0.2.2` es la IP especial del emulador de Android para acceder a `localhost` de tu máquina. Si usas un dispositivo físico o iOS, deberás cambiar esta URL en [`app/services/axiosClient.js`](./app/services/axiosClient.js).

---

## 🔧 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd psys-app
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

O si prefieres usar yarn:

```bash
yarn install
```

### 3️⃣ Configurar la URL del Backend

Edita el archivo [`app/services/axiosClient.js`](./app/services/axiosClient.js) y ajusta la `baseURL` según tu entorno:

```javascript
const axiosClient = axios.create({
    baseURL: "http://TU_IP:8000/api/v1.0/",
})
```

**Opciones comunes:**
- **Emulador Android**: `http://10.0.2.2:8000/api/v1.0/`
- **Simulador iOS**: `http://localhost:8000/api/v1.0/`
- **Dispositivo físico**: `http://TU_IP_LOCAL:8000/api/v1.0/` (ej: `http://192.168.1.100:8000/api/v1.0/`)

---

## 🎮 Comandos Disponibles

### **Iniciar el Servidor de Desarrollo**

```bash
npm start
```

Este comando inicia el servidor de desarrollo de Expo. Verás un código QR que puedes escanear con la app **Expo Go** en tu dispositivo móvil.

### **Ejecutar en Android**

```bash
npm run android
```

Inicia la aplicación en un emulador de Android o dispositivo conectado.

### **Ejecutar en iOS** (solo macOS)

```bash
npm run ios
```

Inicia la aplicación en el simulador de iOS.

### **Ejecutar en Web**

```bash
npm run web
```

Abre la aplicación en tu navegador web.

### **Linter (Verificar Código)**

```bash
npm run lint
```

Ejecuta ESLint para verificar la calidad del código.

### **Reiniciar Proyecto**

```bash
npm run reset-project
```

Mueve el código de inicio a `app-example` y crea un directorio `app` en blanco.

---

## 📱 Estructura del Proyecto

```
psys-app/
├── app/                          # Directorio principal de la aplicación
│   ├── (tabs)/                   # Navegación por pestañas
│   │   ├── _layout.tsx           # Layout de las pestañas
│   │   ├── index.tsx             # Pantalla de inicio (Home)
│   │   ├── products.tsx          # Lista de productos
│   │   ├── sells.tsx             # Módulo de ventas
│   │   └── stock.tsx             # Visualización de stock
│   ├── components/               # Componentes reutilizables
│   │   └── sections.tsx          # Componente de secciones del home
│   ├── services/                 # Servicios de API
│   │   ├── axiosClient.js        # Cliente HTTP configurado
│   │   ├── api.products.js       # Endpoints de productos
│   │   └── api.stock.js          # Endpoints de stock
│   ├── addProducts.jsx           # Pantalla para agregar productos
│   ├── addStock.tsx              # Pantalla para agregar stock (en desarrollo)
│   ├── updateProducts.tsx        # Pantalla para editar productos
│   ├── productDescriptions.tsx   # Detalle de producto
│   └── _layout.tsx               # Layout raíz de la app
├── assets/                       # Recursos estáticos (imágenes, iconos)
├── node_modules/                 # Dependencias del proyecto
├── .expo/                        # Archivos de configuración de Expo
├── app.json                      # Configuración de la aplicación Expo
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
├── eslint.config.js              # Configuración de ESLint
└── README.md                     # Este archivo
```

---

## 🎯 Funcionalidades Detalladas

### **1. Gestión de Productos** 📦

#### **Listar Productos** (`/products`)
- Visualiza todos los productos registrados
- Cada producto muestra su nombre con acciones rápidas:
  - 👁️ **Ver detalles** (icono verde)
  - ✏️ **Editar** (icono azul)
  - 🗑️ **Eliminar** (icono rojo)
- Botón flotante `+` para agregar nuevos productos

#### **Agregar Producto** (`/addProducts`)
Formulario con los siguientes campos:
- **Nombre**: Nombre del producto
- **Marca**: Marca del fabricante
- **Modelo**: Modelo específico
- **Medidas**: Dimensiones o tallas
- **Precio**: Precio de venta (campo numérico)
- **Descripción**: Información adicional (campo multilínea)

#### **Editar Producto** (`/updateProducts`)
- Carga los datos existentes del producto
- Permite modificar cualquier campo
- Actualiza la información en la base de datos

#### **Ver Detalles** (`/productDescriptions`)
Muestra información completa del producto:
- Nombre (título destacado)
- Marca, Modelo y Medidas
- Precio (en verde)
- Descripción completa

### **2. Control de Stock** 📊

#### **Visualizar Stock** (`/stock`)
- Tabla con columnas: **ID**, **Nombre**, **Cantidad**
- Lista todos los productos con su inventario actual
- Botón flotante `+` para agregar stock (funcionalidad en desarrollo)

### **3. Módulo de Ventas** 🛒

> **Estado**: En desarrollo

### **4. Pantalla de Inicio** 🏠

- Acceso rápido a las tres secciones principales:
  - **Productos** (icono verde)
  - **Ventas** (icono amarillo)
  - **Stock** (icono marrón)

---

## 🔌 API Endpoints Utilizados

La aplicación consume los siguientes endpoints:

### **Productos**
- `GET /api/v1.0/Products/` - Obtener todos los productos
- `GET /api/v1.0/Products/{id}/` - Obtener producto por ID
- `POST /api/v1.0/Products/` - Crear nuevo producto
- `PUT /api/v1.0/Products/{id}/` - Actualizar producto
- `DELETE /api/v1.0/Products/{id}/` - Eliminar producto

### **Stock**
- `GET /api/v1.0/Stock` - Obtener inventario completo

---

## 🎨 Personalización

### **Cambiar Colores de la Interfaz**

Los estilos están definidos en cada componente usando `StyleSheet.create()`. Puedes modificar colores, tamaños y espaciados directamente en los archivos `.tsx` y `.jsx`.

### **Modificar Iconos**

Los iconos utilizan **FontAwesome**. Puedes cambiarlos editando el componente correspondiente:

```tsx
<FontAwesome name="nombre-icono" color="color" size={tamaño} />
```

Consulta la [galería de iconos de FontAwesome](https://fontawesome.com/icons).

---

## 🐛 Solución de Problemas

### **Error de conexión a la API**

**Problema**: La app no puede conectarse al backend.

**Soluciones**:
1. Verifica que el backend esté corriendo en el puerto correcto
2. Revisa la URL en [`app/services/axiosClient.js`](./app/services/axiosClient.js)
3. Si usas un dispositivo físico, asegúrate de estar en la misma red WiFi
4. Desactiva temporalmente el firewall si bloquea las conexiones

### **La app no inicia en Android**

**Soluciones**:
1. Asegúrate de tener Android Studio y un emulador configurado
2. Ejecuta `adb devices` para verificar que el emulador esté detectado
3. Limpia la caché: `npx expo start -c`

### **Errores de dependencias**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Recursos Adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Axios Documentation](https://axios-http.com/)

---

## 👥 Contribuir

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y está destinado únicamente para uso interno.

---

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**¡Gracias por usar PSYS-APP!** 🎉
