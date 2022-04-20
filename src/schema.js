const capabilitiesSchema = [
  {
    schema: {
      properties: {
        expire_time: {
          default: 3600,
          type: "integer",
          writeOnly: true
        },
        key_fields: {
          default: ["ip"],
          items: {
            type: "string"
          },
          readOnly: true,
          type: "array"
        },
        method: {
          default: "unblock-ip",
          readOnly: true,
          type: "string"
        }
      },
      required: ["expire_time"],
      type: "object"
    },
    type: "expire"
  },
  {
    schema: {
      properties: {
        cache_time: {
          default: 3600,
          type: "integer",
          writeOnly: true
        },
        key_fields: {
          default: ["ip"],
          items: {
            type: "string"
          },
          readOnly: true,
          type: "array"
        },
        method: {
          default: "unblock-ip",
          readOnly: true,
          type: "string"
        }
      },
      required: ["cache_time"],
      type: "object"
    },
    type: "cache"
  }
];
