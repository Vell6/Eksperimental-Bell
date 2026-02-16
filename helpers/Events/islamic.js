+/*!-======[ Default Export Function ]======-!*/
+export default async function on({ cht, ev }) {
+  if (!cfg.menu.tags.religion) cfg.menu.tags.religion = '*<☪️Religion>*';
 
+  ev.on(
+    {
+      cmd: ['surah', 'surahrandom', 'randomsurah'],
+      listmenu: ['surah'],
+      tag: 'religion',
+      energy: 5,
+    },
+    async () => {
+      let response;
+
+      try {
+        response = await fetch(
+          'https://api.autoresbot.com/api/surah/random'
+        ).then((res) => res.json());
+      } catch {
+        return cht.reply('Gagal mengambil data surah dari API, coba lagi nanti.');
+      }
+
+      if (!response?.status || response?.code !== 200 || !Array.isArray(response?.data)) {
+        return cht.reply('Data surah dari API tidak valid.');
+      }
+
+      let surah = response.data?.[0];
+      if (!surah) return cht.reply('Surah tidak ditemukan dari API.');
+
+      let text =
+        `📖 *Surah Random*\n\n` +
+        `• ID: ${surah.id || '-'}\n` +
+        `• Nama: ${surah.name || '-'}\n` +
+        `• Arab: ${surah.arabic_translation || '-'}\n` +
+        `• English: ${surah.english_translation || '-'}\n` +
+        `• Indonesia: ${surah.indonesian_translation || '-'}\n` +
+        `• Nomor Surah: ${surah.surah_number || '-'}\n` +
+        `• Jumlah Ayat: ${surah.number_of_verses || '-'}\n` +
+        `• Turun di: ${surah.revealed_in || '-'}\n` +
+        `• Tipe: ${surah.type || '-'}\n` +
+        `• Audio: ${surah.audio_link || '-'}\n`;
+
+      return cht.reply(text);
+    }
+  );
+}
 
EOF
)
