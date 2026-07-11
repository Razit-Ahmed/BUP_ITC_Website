function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags
      .flatMap((tag) => String(tag).split(","))
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeEventPayload(payload = {}) {
  const normalizedPayload = {
    ...payload,
    tags: normalizeTags(payload.tags)
  };

  if (!normalizedPayload.image) {
    delete normalizedPayload.image;
  }

  return normalizedPayload;
}

function serializeEvent(event) {
  const eventObject = typeof event.toObject === "function"
    ? event.toObject()
    : event;

  return normalizeEventPayload(eventObject);
}

module.exports = {
  normalizeTags,
  normalizeEventPayload,
  serializeEvent
};
