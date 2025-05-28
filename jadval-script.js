// توابع ناوبری و جابه‌جایی بین صفحات مختلف
function showExercise(exerciseId) {
    // پیدا کردن تمام صفحات (div هایی که کلاس screen دارند) و مخفی کردن آن‌ها
    const screens = document.querySelectorAll('.screen');
    // حلقه forEach برای پیمایش تمام صفحات و حذف کلاس active از همه آن‌ها
    screens.forEach(screen => screen.classList.remove('active'));

    // نمایش تمرین انتخاب شده با اضافه کردن کلاس active به آن
    // getElementById برای پیدا کردن المنت با شناسه مشخص استفاده می‌شود
    document.getElementById(exerciseId).classList.add('active');

    // پاک کردن فرم‌ها و نمایشگرها هنگام تعویض تمرین‌ها
    if (exerciseId === 'exercise2') {
        // اگر تمرین 2 انتخاب شده، فرم را پاک کن و پیام خطا را مخفی کن
        document.getElementById('registrationForm').reset();
        document.getElementById('message').style.display = 'none';
    }
    if (exerciseId === 'exercise3') {
        // اگر تمرین 3 انتخاب شده، صفحه ماشین‌حساب را پاک کن
        clearDisplay();
    }
}

function showMainMenu() {
    // برگشت به منوی اصلی - پیدا کردن همه صفحات
    const screens = document.querySelectorAll('.screen');
    // مخفی کردن تمام صفحات با حذف کلاس active
    screens.forEach(screen => screen.classList.remove('active'));

    // نمایش منوی اصلی با اضافه کردن کلاس active
    document.getElementById('mainMenu').classList.add('active');
}




















// تمرین اول: تولیدکننده جدول پویا
// رویداد DOMContentLoaded زمانی اجرا می‌شود که کل صفحه HTML بارگذاری شده باشد
document.addEventListener('DOMContentLoaded', function() {
    // پیدا کردن المنت‌های مورد نیاز برای تمرین اول - ایجاد جدول پویا
    const generateBtn = document.getElementById('generateBtn'); // دکمه تولید جدول
    const rowsInput = document.getElementById('rows'); // ورودی تعداد ردیف‌ها
    const colsInput = document.getElementById('cols'); // ورودی تعداد ستون‌ها
    const tableContainer = document.getElementById('tableContainer'); // محل نمایش جدول

    // اضافه کردن رویداد کلیک به دکمه تولید جدول
    // addEventListener برای گوش دادن به رویدادهای مختلف استفاده می‌شود
    generateBtn.addEventListener('click', function() {
        // parseInt برای تبدیل رشته به عدد صحیح استفاده می‌شود
        const rows = parseInt(rowsInput.value); // دریافت تعداد ردیف از ورودی کاربر
        const cols = parseInt(colsInput.value); // دریافت تعداد ستون از ورودی کاربر

        // بررسی اینکه آیا تعداد ردیف و ستون مثبت هستند یا نه
        if (rows > 0 && cols > 0) {
            generateTable(rows, cols); // فراخوانی تابع تولید جدول
        }
    });




















    // تابع تولید جدول پویا بر اساس تعداد ردیف و ستون
    function generateTable(rows, cols) {
        // پاک کردن جدول قبلی (اگر وجود داشته باشد)
        tableContainer.innerHTML = '';

        // ایجاد المنت جدول جدید با استفاده از createElement
        const table = document.createElement('table');

        // حلقه for برای ایجاد ردیف‌های جدول
        for (let i = 0; i < rows; i++) {
            // ایجاد یک ردیف جدید (tr = table row)
            const row = document.createElement('tr');

            // حلقه داخلی برای ایجاد ستون‌های هر ردیف
            for (let j = 0; j < cols; j++) {
                // ایجاد یک خانه جدول (td = table data)
                const cell = document.createElement('td');
                // تنظیم متن خانه به صورت "شماره ردیف، شماره ستون"
                cell.textContent = `${i + 1},${j + 1}`;
                // اضافه کردن خانه به ردیف با appendChild
                row.appendChild(cell);
            }

            // اضافه کردن ردیف کامل شده به جدول
            table.appendChild(row);
        }

        // اضافه کردن جدول کامل شده به کانتینر نمایش
        tableContainer.appendChild(table);
    }




















    // تمرین دوم: اعتبارسنجی فرم (Form Validation)
    // پیدا کردن المنت‌های مورد نیاز برای فرم ثبت‌نام
    const form = document.getElementById('registrationForm'); // فرم ثبت‌نام
    const usernameInput = document.getElementById('username'); // ورودی نام کاربری
    const passwordInput = document.getElementById('password'); // ورودی رمز عبور
    const messageDiv = document.getElementById('message'); // المنت نمایش پیغام

    // اضافه کردن رویداد submit به فرم
    // رویداد submit زمانی فعال می‌شود که کاربر روی دکمه ارسال کلیک کند
    form.addEventListener('submit', (submitEvent) => {
        // preventDefault() از ارسال پیش‌فرض فرم جلوگیری می‌کند
        // تا بتوانیم اعتبارسنجی خود را انجام دهیم
        submitEvent.preventDefault();

        // دریافت مقادیر وارد شده توسط کاربر
        // trim() فضاهای خالی ابتدا و انتهای رشته را حذف می‌کند
        const username = usernameInput.value.trim();
        const password = passwordInput.value; // رمز عبور بدون trim چون ممکن است فضای خالی معنادار باشد

        // اعتبارسنجی نام کاربری - باید حداقل 5 کاراکتر باشد
        if (username.length < 5) {
            // نمایش پیغام خطا و خروج از تابع با return
            showMessage('Username must be at least 5 characters long.', 'error');
            return;
        }

        // اعتبارسنجی رمز عبور با استفاده از تابع isValidPassword
        if (!isValidPassword(password)) {
            // نمایش پیغام خطا برای رمز عبور نامعتبر
            showMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.', 'error');
            return;
        }

        // اگر همه اعتبارسنجی‌ها موفق بودند، پیغام موفقیت نمایش می‌دهیم
        showMessage('Form submitted successfully!', 'success');
    });

    // تابع بررسی معتبر بودن رمز عبور
    function isValidPassword(password) {
        // استفاده از Regular Expression (RegEx) برای بررسی الگوهای مختلف
        const hasUppercase = /[A-Z]/.test(password); // بررسی وجود حروف بزرگ انگلیسی
        const hasLowercase = /[a-z]/.test(password); // بررسی وجود حروف کوچک انگلیسی
        const hasNumber = /\d/.test(password); // بررسی وجود اعداد (\d معادل [0-9] است)

        // رمز عبور معتبر است اگر هر سه شرط برقرار باشد (&&)
        return hasUppercase && hasLowercase && hasNumber;
    }

    // تابع نمایش پیغام به کاربر
    function showMessage(text, type) {
        messageDiv.textContent = text; // تنظیم متن پیغام
        messageDiv.className = type; // تنظیم کلاس CSS برای استایل (error یا success)
        messageDiv.style.display = 'block'; // نمایش المنت پیغام
    }
});

















// تمرین سوم: ماشین‌حساب تعاملی
// متغیرهای سراسری برای نگهداری حالت ماشین‌حساب
let display = document.getElementById('display'); // المنت نمایشگر ماشین‌حساب
let currentInput = ''; // ورودی فعلی که کاربر وارد می‌کند
let operator = ''; // عملگر انتخاب شده (+، -، *، /)
let previousInput = ''; // عدد قبلی که قبل از انتخاب عملگر وارد شده

// تابع اضافه کردن مقدار به نمایشگر (اعداد و عملگرها)
function appendToDisplay(value) {
    // بررسی اینکه آیا مقدار وارد شده یک عملگر است یا نه
    if (['+', '-', '*', '/'].includes(value)) {
        // اگر هیچ ورودی وجود نداشته باشد، عملگر را نادیده بگیر
        if (currentInput === '' && previousInput === '') return;

        // اگر قبلاً عملگری انتخاب شده و عدد جدیدی وارد شده، ابتدا محاسبه کن
        if (operator !== '' && currentInput !== '') {
            calculate(); // محاسبه نتیجه قبل از ادامه
        }

        // تنظیم عملگر جدید و جابه‌جایی اعداد
        operator = value;
        previousInput = currentInput; // عدد فعلی به عدد قبلی تبدیل می‌شود
        currentInput = ''; // پاک کردن ورودی فعلی برای عدد بعدی

        // نمایش عبارت ریاضی در صفحه نمایش
        display.value = previousInput + ' ' + value + ' ';
    } else {
        // اگر مقدار یک عدد یا نقطه است، به ورودی فعلی اضافه کن
        currentInput += value;

        // نمایش مناسب بر اساس اینکه عملگری انتخاب شده یا نه
        if (operator === '') {
            // اگر عملگری انتخاب نشده، فقط عدد را نمایش بده
            display.value = currentInput;
        } else {
            // اگر عملگری انتخاب شده، کل عبارت را نمایش بده
            display.value = previousInput + ' ' + operator + ' ' + currentInput;
        }
    }
}

// تابع محاسبه نتیجه عملیات ریاضی
function calculate() {
    // بررسی اینکه همه اطلاعات لازم برای محاسبه موجود باشد
    if (previousInput === '' || currentInput === '' || operator === '') return;

    let result; // متغیر نگهداری نتیجه
    // parseFloat برای تبدیل رشته به عدد اعشاری استفاده می‌شود
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // انجام عملیات ریاضی بر اساس عملگر انتخاب شده
    switch (operator) {
        case '+':
            result = prev + current; // جمع
            break;
        case '-':
            result = prev - current; // تفریق
            break;
        case '*':
            result = prev * current; // ضرب
            break;
        case '/':
            // بررسی تقسیم بر صفر
            if (current === 0) {
                alert('Cannot divide by zero!'); // نمایش پیغام خطا
                clearDisplay(); // پاک کردن صفحه نمایش
                return; // خروج از تابع
            }
            result = prev / current; // تقسیم
            break;
        default:
            return; // اگر عملگر نامعتبر باشد، خروج
    }

    // رفع مشکل اعداد اعشاری بی‌نهایت در JavaScript
    // Math.round برای گرد کردن عدد استفاده می‌شود
    result = Math.round(result * 100000000) / 100000000;

    // نمایش نتیجه و بازنشانی متغیرها
    display.value = result;
    currentInput = result.toString(); // تبدیل نتیجه به رشته برای ادامه محاسبات
    previousInput = ''; // پاک کردن عدد قبلی
    operator = ''; // پاک کردن عملگر
}

// تابع پاک کردن کامل صفحه نمایش و بازنشانی ماشین‌حساب
function clearDisplay() {
    // بررسی وجود المنت display (برای جلوگیری از خطا هنگام تغییر صفحه)
    if (display) {
        display.value = ''; // پاک کردن صفحه نمایش
        currentInput = ''; // پاک کردن ورودی فعلی
        operator = ''; // پاک کردن عملگر
        previousInput = ''; // پاک کردن ورودی قبلی
    }
}

// تابع حذف آخرین کاراکتر وارد شده (Backspace)
function deleteLast() {
    // فقط اگر ورودی فعلی موجود باشد
    if (currentInput !== '') {
        // slice(-1) آخرین کاراکتر را حذف می‌کند
        currentInput = currentInput.slice(0, -1);

        // به‌روزرسانی نمایشگر بر اساس حالت فعلی
        if (operator === '') {
            // اگر عملگری انتخاب نشده، فقط ورودی فعلی را نمایش بده
            display.value = currentInput;
        } else {
            // اگر عملگری انتخاب شده، کل عبارت را نمایش بده
            display.value = previousInput + ' ' + operator + ' ' + currentInput;
        }
    }
}