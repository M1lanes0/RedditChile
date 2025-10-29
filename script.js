const api = "https://www.reddit.com/r/mod/about/log/.json?feed=38a1201d33c43f6b758c42b899a33bdd93f4836f&user=rchilemodlog&limit=100";

// Proxy para evitar CORS
const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(api);

fetch(url)
  .then(response => response.json())
  .then(json => {
      const logs = json.data.children.map(item => {
        const d = item.data;
        return {
          Moderador: d.mod,
          Acción: d.action,
          Descripción: d.description || "-",
          Usuario: d.target_author || "-",
          Subreddit: d.subreddit || "-",
          Fecha: new Date(d.created_utc * 1000).toLocaleString(),
          Enlace: d.target_permalink 
            ? `<a href="https://www.reddit.com${d.target_permalink}" target="_blank">Ver</a>`
            : "-"
        };
      });

      $('#tablaLogs').DataTable({
        data: logs,
        columns: [
          { title: "Moderador", data: "Moderador" },
          { title: "Acción", data: "Acción" },
          { title: "Descripción", data: "Descripción" },
          { title: "Usuario", data: "Usuario" },
          { title: "Subreddit", data: "Subreddit" },
          { title: "Fecha", data: "Fecha" },
          { title: "Enlace", data: "Enlace" }
        ],
        pageLength: 25,
        responsive: true,
        order: [[5, 'desc']],
        columnDefs: [
          { targets: 6, orderable: false } // no ordenar por enlace
        ]
      });
    })
  .catch(err => console.error("Error cargando logs:", err));
