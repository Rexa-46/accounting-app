#!/bin/bash

# Build script for Android Debug APK

echo "🔨 شروع ساخت Debug APK..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 نصب dependencies..."
    npm install
fi

echo "🧹 پاک کردن build قدیمی..."
cd android && ./gradlew clean && cd ..

echo "🔨 ساخت Debug APK..."
cd android && ./gradlew assembleDebug && cd ..

echo ""
echo "✅ Build تکمیل شد!"
echo ""
echo "📁 فایل APK در مسیر زیر است:"
echo "android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "💡 برای نصب بر روی گوشی:"
echo "adb install -r android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
