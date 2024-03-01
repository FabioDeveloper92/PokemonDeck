import { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import NoImage from "../../../../../img/no-image.svg";
import { Sprites } from "../../../model/api/pokemon-detail.model";
import { CarouselImage } from "../../../model/internal/carousel-image.model";

class PokemonCarouselComponentProps {
  name: string;
  sprites: Sprites;
}

export function PokemonCarouselComponent({
  name,
  sprites,
}: PokemonCarouselComponentProps) {
  const [images, setImages] = useState<CarouselImage[]>();

  useEffect(() => {
    let updImages = [];

    if (sprites) {
      if (sprites.other?.dream_world?.front_default)
        updImages.push(
          new CarouselImage(sprites.other.dream_world.front_default, "")
        );

      const myKeys = Object.keys(sprites);
      myKeys.forEach((k) => {
        let value = sprites[k];

        if (value && (typeof value === "string" || value instanceof String))
          updImages.push(
            new CarouselImage(value as string, k.replace("_", " "))
          );
      });
    }

    if (updImages.length === 0) updImages.push(NoImage);

    setImages(updImages);
  }, [sprites]);

  return (
    <>
      {images && (
        <Carousel
          interval={null}
          className="pokemon-detail-carousel h-100 bg-dark bg-gradient rounded"
        >
          {images.map((img, index) => (
            <Carousel.Item key={index} className="h-100">
              <div className="d-flex align-items-center justify-content-center h-100">
                <Image height={300} title={name} alt={name} src={img.url} />
                <Carousel.Caption>{img.description}</Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}
