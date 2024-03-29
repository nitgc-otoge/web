import type { WorkItem } from "../../types/workItem.ts"
import { SoundCloudEmbed } from '../SoundCloudEmbed.tsx'
import { BandcampEmbedPlayer } from "../BandcampEmbedPlayer.tsx";
import { LinkBtn } from "../LinkBtn.tsx";
import { asset } from "$fresh/runtime.ts";

export function Item(props: {
  data: WorkItem
}) {
  return (
    <div class="py-2">
      <div>{props.data.date}</div>
      <div class="mt-2 text-xl font-semibold">{props.data.title}</div>
      <p class="mt-2">{props.data.description}</p>
      <div class="mt-4 flex space-x-2">
        {props.data.url.venue ? <LinkBtn href={props.data.url.venue}>Venue</LinkBtn> : '' }
        {props.data.url.dl ? <LinkBtn href={props.data.url.dl}>Download</LinkBtn> : '' }
      </div>
      <div class="flex flex-wrap gap-2">
        {props.data.images ? props.data.images.map((image) => (
          <a href={`/images/${image}`} target="_blank">
            <img src={asset(`/images/${image}`)} class="mt-4 w-48" />
          </a>
        )) : ''}
      </div>
      {/* {props.data.embed ? <div class="mt-4">
        {props.data.embed.soundcloud ? 
          <SoundCloudEmbed set-id={props.data.embed.soundcloud.setId} album-id={props.data.embed?.soundcloud?.albumId} album-name={props.data.embed?.soundcloud?.albumName}></SoundCloudEmbed>
          : props.data.embed.bandcamp ? 
          <BandcampEmbedPlayer id={props.data.embed.bandcamp.id}></BandcampEmbedPlayer> : ''
        }
      </div> : ''} */}
      {props.data.files.length > 0 ? <div class="mt-4 font-semibold">Track List</div> : ""}
      <div class="mt-2 text-left text-sm overflow-auto">
        {props.data.files.map((file) => (
          <div class="flex flex-nowrap items-center gap-2">
            {props.data.category === 'Music' ? <div class="">{file.trackNo}.</div> : file.genre ? <div class="flex-none">[{file.genre}]</div> : ''}
            <div class="py-1 flex-none">
              {file.credits.map((credit, index) => (
                <span>{credit.name}{credit.role !== '' ? <span>({credit.role})</span> : ''}{file.credits.length - 1 !== index ? <span>,&nbsp;</span> : ''}</span>
              ))}
            </div>
            <div>-</div>
            <div class="py-1 flex-none">{file.title}</div>
          </div>
        ))}
      </div>
      <div class="mt-4 font-semibold">Credits</div>
      <div class="mt-2 flex flex-wrap gap-2 text-sm">
        {props.data.credits.map((item, index) => {
          return (
            <div>
              <span>{item.name}</span><span>({item.role})</span>
              {props.data.credits.length - 1 !== index ? <span>,&nbsp;</span> : ''}
            </div>
        )})}
      </div>
    </div>
  );
}