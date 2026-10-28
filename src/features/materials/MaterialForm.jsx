import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Chip,
  ErrorText,
  Field,
  Input,
  Modal,
  Select,
  TextArea,
} from "@/components/ui";
import { CATEGORIES, PAGES } from "@/config/materials";
import { theme as t } from "@/styles/theme";
import { isUrl } from "@/utils/url";
import { createMaterial, updateMaterial } from "./api";
import { EMPTY_MATERIAL, validateMaterial } from "./validate";

const Row = styled.div`
  display: flex;
  gap: 10px;
`;
const Preview = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  border: 2px solid ${t.line};
  border-radius: 8px;
  background: #fff;
`;

export default function MaterialForm({ page, item, knownTags, onClose }) {
  const [f, setF] = useState(
    item ? { ...EMPTY_MATERIAL, ...item } : EMPTY_MATERIAL,
  );
  const [newTag, setNewTag] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (tag) =>
    setF({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((x) => x !== tag)
        : [...f.tags, tag],
    });
  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !f.tags.includes(tag)) setF({ ...f, tags: [...f.tags, tag] });
    setNewTag("");
  };
  const allTags = [...new Set([...knownTags, ...f.tags])];

  const submit = async (e) => {
    e.preventDefault();
    const problem = validateMaterial(f);
    if (problem) return setErr(problem);
    setBusy(true);
    const data = {
      title: f.title.trim(),
      description: f.description.trim(),
      category: f.category,
      link: f.link.trim(),
      photo: f.photo.trim(),
      tags: f.tags,
    };
    try {
      await (item ? updateMaterial(item.id, data) : createMaterial(page, data));
      onClose();
    } catch {
      setErr("Could not save. Check your connection and Firestore rules.");
      setBusy(false);
    }
  };

  return (
    <Modal onSubmit={submit}>
      <h2>{item ? "Edit material" : `Add material to ${PAGES[page].label}`}</h2>
      {item && (
        <Field>
          Material ID
          <Input value={item.id} readOnly />
        </Field>
      )}
      <Field>
        Title
        <Input value={f.title} onChange={set("title")} />
      </Field>
      <Field>
        Description
        <TextArea
          rows={3}
          value={f.description}
          onChange={set("description")}
        />
      </Field>
      <Field>
        Category
        <Select value={f.category} onChange={set("category")}>
          <option value="">Choose category</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </Field>
      <Field>
        Link
        <Input value={f.link} onChange={set("link")} placeholder="https://" />
      </Field>
      <Field>
        Logo URL
        <Row style={{ alignItems: "center" }}>
          <Input
            value={f.photo}
            onChange={set("photo")}
            placeholder="https://…/logo.png"
          />
          {isUrl(f.photo) && <Preview src={f.photo} alt="Logo preview" />}
        </Row>
      </Field>
      <div>
        Tags
        <Row style={{ flexWrap: "wrap", gap: 6, margin: "6px 0" }}>
          {allTags.map((tag) => (
            <Chip
              type="button"
              key={tag}
              $on={f.tags.includes(tag)}
              aria-pressed={f.tags.includes(tag)}
              onClick={() => toggle(tag)}
            >
              {tag}
            </Chip>
          ))}
        </Row>
        <Row>
          <Input
            value={newTag}
            placeholder="Add a new tag"
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <Button type="button" onClick={addTag}>
            Add tag
          </Button>
        </Row>
      </div>
      {err && <ErrorText role="alert">{err}</ErrorText>}
      <Row style={{ justifyContent: "flex-end" }}>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button $primary disabled={busy}>
          {item ? "Save changes" : "Add material"}
        </Button>
      </Row>
    </Modal>
  );
}
