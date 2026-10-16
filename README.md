# Cotizador Notarial (Android)

App Android (Capacitor) con el cotizador notarial de Costa Rica. Funciona sin internet.
La carpeta `android/` se genera al compilar, no hace falta crearla a mano.

## Opción A: APK con GitHub (sin instalar nada)
1. Cree un repositorio nuevo en github.com y suba el contenido de esta carpeta (rama `main`).
2. Entre a la pestaña **Actions**, abra **Compilar APK** y pulse **Run workflow** (también corre solo con cada push).
3. Al terminar (unos 5 a 8 minutos), abra la ejecución y descargue `cotizador-notarial-apk` (un zip con `app-debug.apk`).
4. Pase el APK al teléfono, ábralo y permita instalar apps de orígenes desconocidos.

## Opción B: en su computadora
Requisitos: Node 20, Java 17 y Android Studio (o el SDK de Android con `ANDROID_HOME`).

    npm install
    npm run prepare:www        # copia las fuentes para uso sin internet
    npx cap add android
    npm run icons              # ícono de la app
    npx cap sync android
    cd android && ./gradlew assembleDebug

El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.
Para abrirlo en Android Studio: `npx cap open android`.

## Notas
- El APK de depuración sirve para instalar en teléfonos propios. Para publicar en Google Play hace falta
  un paquete firmado (`./gradlew bundleRelease`) con su propia llave.
- Para cambiar el contenido, edite `www/index.html` y repita `npx cap sync android`.
- Identificador de la app: `cr.notarial.cotizador` (se cambia en `capacitor.config.json`).
- Los montos del arancel son referencias del manual de octubre de 2026: confirme valores vigentes antes de cobrar.
