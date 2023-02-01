import { contentType } from 'https://deno.land/std@0.149.0/media_types/mod.ts'
import { extname } from 'https://deno.land/std@0.149.0/path/mod.ts'
import { join } from 'https://deno.land/std@0.149.0/path/mod.ts'
import fast, { type Context } from 'https://deno.land/x/fast@3.8.0/mod.ts'
import toOldeEnglish from 'https://gist.githubusercontent.com/omar2205/0952ec65fe6f2fc75907bee9ca952f45/raw/a68d5f385a5a2d74afa41d067467451406f3412c/convert.ts'

const app = fast()

app.post('/to-olde', async (ctx: Context) => {
  const { text, is_bold = true } = await ctx.request.json()

  const o = toOldeEnglish(text, is_bold)

  return Response.json({ text: o })
})

app.get('/*', async (ctx) => {
  try {
    const { pathname } = new URL(ctx.request.url)
    const file_url = join('static', pathname === '/' ? 'index.html' : pathname)
    const file_stats = await Deno.stat(file_url)
    const file_type = contentType(extname(file_url)) ||
      'application/octet-stream'
    const file_content = await Deno.open(file_url)

    return new Response(file_content.readable, {
      headers: new Headers({
        'Content-Type': file_type,
        'Content-Length': file_stats.size.toString(),
      }),
    })
  } catch (error) {
    return new Response(null, {
      status: error instanceof Deno.errors.NotFound ? 404 : 500,
    })
  }
})

await app.serve()
