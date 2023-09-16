export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "date",
        type: "datetime",
      },
      {
        name: "place",
        type: "string",
      },
      {
        name: "description",
        type: "text",
      },
      {
        name: "projectType",
        title: "Project type",
        type: "string",
        options: {
          list: [
            { value: "personal", title: "Personal" },
            { value: "client", title: "Client" },
            { value: "school", title: "School" },
            { value: "clone", title: "Clone"},
            { value: "games", title: "Games"},
            { value: "design", title: "Design"},
            { value: "mobile application", title: "Mobile Application"}
          ],
        },
      },
      {
        name: "link",
        type: "url",
      },
      {
        name: "tags",
        type: "array",
        of: [
          {
            type: "string",
          },
        ],
        options: {
          layout: "tags",
        },
      },
    ],
  };