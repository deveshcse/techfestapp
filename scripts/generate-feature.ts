import fs from "fs";
import path from "path";

const feature = process.argv[2];

if (!feature) {
  console.error("❌ Usage: npm run gen:feature event");
  process.exit(1);
}

const baseDir = path.join("src/features", feature);

const files = {
  [`schemas/${feature}.schema.ts`]: schemaTemplate(feature),
  [`types/${feature}.types.ts`]: typesTemplate(feature),
  [`components/${feature}-columns.tsx`]: columnsTemplate(feature),
  [`components/${feature}-form.tsx`]: formTemplate(feature),
};

for (const [file, content] of Object.entries(files)) {
  const filePath = path.join(baseDir, file);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log("✅ Created", filePath);
}

// ---------------- Templates ----------------

function schemaTemplate(name: string) {
  return `
import { z } from "zod";

export const base${cap(name)}Schema = {
  title: z.string().min(1),
  description: z.string().optional(),
  published: z.boolean(),
};

export const ${name}FormSchema = z.object({
  ...base${cap(name)}Schema,
  start_date: z.date(),
  end_date: z.date(),
});

export const ${name}ApiSchema = z.object({
  ...base${cap(name)}Schema,
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
});

export const create${cap(name)}Schema = ${name}ApiSchema.extend({
  published: z.boolean().default(false),
});

export const update${cap(name)}Schema = create${cap(name)}Schema.partial();

export const ${name}QuerySchema = z.object({
  limit: z.coerce.number().default(10),
  offset: z.coerce.number().default(0),
});
`;
}

function typesTemplate(name: string) {
  return `
import { z } from "zod";
import {
  ${name}FormSchema,
  create${cap(name)}Schema,
  update${cap(name)}Schema,
  ${name}QuerySchema,
} from "../schemas/${name}.schema";

export type ${cap(name)}FormValues = z.infer<typeof ${name}FormSchema>;
export type Create${cap(name)}Input = z.infer<typeof create${cap(name)}Schema>;
export type Update${cap(name)}Input = z.infer<typeof update${cap(name)}Schema>;
export type ${cap(name)}QueryInput = z.infer<typeof ${name}QuerySchema>;

export type ${cap(name)} = Create${cap(name)}Input & {
  id: string;
  created_at: string;
  updated_at: string;
};
`;
}

function columnsTemplate(name: string) {
  return `
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ${cap(name)} } from "../types/${name}.types";

export const ${name}Columns: ColumnDef<${cap(name)}>[] = [
  { accessorKey: "title", header: "Title" },
];
`;
}

function formTemplate(name: string) {
  return `
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ${name}FormSchema } from "../schemas/${name}.schema";
import { ${cap(name)}FormValues } from "../types/${name}.types";

export function ${cap(name)}Form() {
  const form = useForm<${cap(name)}FormValues>({
    resolver: zodResolver(${name}FormSchema),
  });

  return <form>TODO</form>;
}
`;
}

function cap(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
