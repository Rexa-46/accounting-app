#!/bin/bash

# Setup script for first-time setup

echo "🚀 آغاز تنظیم اولیه پروژه..."
echo ""

echo "1️⃣ نصب Node dependencies..."
npm install

echo ""
echo "2️⃣ نصب Native dependencies (Android)..."
cd android
./gradlew clean
cd ..

echo ""
echo "3️⃣ Bundle JavaScript..."
echo "💡 در صورت نیاز، دستور زیر را اجرا کنید:"
echo "npm run bundle:android"

echo ""
echo "✅ تنظیم اولیه تکمیل شد!"
echo ""
echo "🎯 مراحل بعدی:"
echo "1. برای توسعه: npm start"
echo "2. برای اجرا بر روی Android: npm run android"
echo "3. برای ساخت APK: npm run build:android"
echo ""
