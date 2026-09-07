#!/bin/bash

# Build script for Android APK

echo "🔨 شروع ساخت APK..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 نصب dependencies..."
    npm install
fi

# Navigate to android directory
cd android

echo "🧹 پاک کردن build قدیمی..."
./gradlew clean

echo "🔨 ساخت Release APK..."
./gradlew assembleRelease

echo ""
echo "✅ Build تکمیل شد!"
echo ""
echo "📁 فایل APK در مسیر زیر است:"
echo "android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "💡 برای نصب بر روی گوشی:"
echo "adb install -r android/app/build/outputs/apk/release/app-release.apk"
echo ""

cd ..