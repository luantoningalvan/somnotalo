import { defer } from "@defer/client";
import { prisma } from "../src/services/prisma";
import { WasabiService } from "../src/services/wasabi";
import archiver from "archiver";
import fs from "fs";

async function publishAlbum(id: string) {
  const wasabiService = new WasabiService();

  const findAlbum = await prisma.album.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      songs: true,
      author: true,
    },
  });

  const zipFileName = `albums/${findAlbum.slug}.zip`;
  const localDir = "./downloads";

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir);
  }

  for await (const song of findAlbum.songs) {
    const newName = `${String(song.position - 1).padStart(2, "0")} - ${
      findAlbum.name
    } - ${findAlbum.author.name}`;

    await prisma.song.update({
      where: {
        id: song.id,
      },
      data: {
        name: newName,
      },
    });

    const localPath = `${localDir}/${song.name}`;

    await new Promise<void>(async (resolve, reject) => {
      const fileKey = song.audioUrl.split("/somnotalo/")[1];

      const inputStream = await wasabiService.dowloadFileToLocal(fileKey);
      const outputStream = fs.createWriteStream(localPath);

      inputStream.pipe(outputStream);
      outputStream.on("finish", () => {
        console.log(`Arquivo ${localPath} salvo com sucesso!`);
        resolve();
      });
      outputStream.on("error", (error) => {
        reject(error);
      });
    });

    archive.file(localPath, { name: `${song.name}.mp3` });
  }

  archive.finalize();

  const buffers = [];

  await new Promise<void>((resolve, reject) => {
    archive.on("data", (data) => {
      buffers.push(data);
    });

    archive.on("end", async () => {
      const buffer = Buffer.concat(buffers);
      await wasabiService.saveFile(zipFileName, buffer);
      console.log(
        `Arquivo ZIP criado para o álbum com o nome de ${zipFileName}`
      );
      resolve();
    });

    archive.on("error", (error) => {
      console.error(`Erro ao criar arquivo ZIP: ${error.message}`);
      reject(error);
    });
  });

  await prisma.album.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "PUBLISHED",
    },
  });
}

export default defer(publishAlbum);
