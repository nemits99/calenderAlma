// Daftar tanggal merah (format MM-DD)
const holidays = ["01-01", "01-27", "01-29", "03-29", "03-31","04-01", "04-18", "04-20","05-01", "05-12", "05-29",
    "06-01", "06-06", "06-27","08-17", "09-05","12-25"];
   
const holidayNames = {
"01-01": "Tahun Baru 2025 Masehi",
"01-27": "Isra Mikraj Nabi Muhammad Saw",
"01-29": "Tahun Baru Imlek 2576 Kongzili",
"03-29": "Hari Suci Nyepi (Tahun Baru Saka 1947)",
"03-31": "Idul Fitri 1446 Hijriah",
"04-01": "Idul Fitri 1446 Hijriah",
"04-18": "Wafat Yesus Kristus",
"04-20": "Kebangkitan Yesus Kristus (Paskah)",
"05-01": "Hari Buruh Internasional",
"05-12": "Hari Raya Waisak 2569 BE",
"05-29": "Kenaikan Yesus Kristus",
"06-01": "Hari Lahir Pancasila",
"06-06": "Idul Adha 1446 Hijriah",
"06-27": "1 Muharam Tahun Baru Islam 1447 Hijriah",
"08-17": "Proklamasi Kemerdekaan",
"09-05": "Maulid Nabi Muhammad Saw",
"12-25": "Kelahiran Yesus Kristus"
};

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Inisialisasi kalender
function initCalendar() {
    const header = document.getElementById("current-month-year");
    header.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    generateCalendar();
}

// Fungsi untuk mengganti bulan
document.getElementById("prev-month").addEventListener("click", () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    initCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    initCalendar();
});

function generateCalendar() {
    const datesContainer = document.getElementById("dates-container");
    const holidayText = document.getElementById("holidayText");
    datesContainer.innerHTML = ""; // Reset kalender
    holidayText.innerHTML = "Libur: "; // Reset teks tanggal merah

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let holidayList = []; // Simpan daftar tanggal merah

    // Dapatkan tanggal saat ini
    const today = new Date();
    const isCurrentMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();
    const currentDay = isCurrentMonth ? today.getDate() : null;

    // Tambahkan tanggal kosong di awal bulan
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const emptyDiv = document.createElement("div");
        datesContainer.appendChild(emptyDiv);
    }

    // Generate tanggal
    for (let i = 1; i <= daysInMonth; i++) {
        const dateDiv = document.createElement("div");
        const day = i.toString().padStart(2, '0'); // Format dua digit
        const month = (currentMonth + 1).toString().padStart(2, '0'); // Format dua digit
        const dateStr = `${month}-${day}`;

        dateDiv.className = "date";
        dateDiv.textContent = i;

        // Tandai tanggal merah
        if (holidays.includes(dateStr)) {
            dateDiv.classList.add("holiday-mark");
            holidayList.push(`${i} ${holidayNames[dateStr] || ""}`);
        }

        // Tandai tanggal hari ini
        if (i === currentDay) {
            dateDiv.classList.add("today");
        }

        datesContainer.appendChild(dateDiv);
    }

    // Tampilkan daftar tanggal merah
    if (holidayList.length > 0) {
        holidayText.innerHTML += holidayList.join(", ");
    } else {
        holidayText.innerHTML += "Tidak ada libur.";
    }
}


// Jalankan kalender
initCalendar();


