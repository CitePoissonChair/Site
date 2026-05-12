<p
  className={`
    whitespace-pre-line
    text-white

    ${
      image.labelType === 'list'
        ? 'text-xs md:text-sm uppercase tracking-[0.25em] leading-relaxed font-light'
        : ''
    }

    ${
      image.labelType === 'quote'
        ? 'text-2xl md:text-4xl leading-tight font-light max-w-[500px]'
        : ''
    }

    ${
      !image.labelType
        ? 'text-2xl md:text-5xl font-medium'
        : ''
    }
  `}
>
  {image.label}
</p>
