

export enum TIME {
    SECOND = 1000,
    MINUTE = 60 * TIME.SECOND,
    HOUR = 60 * TIME.MINUTE,
    DAY = 24 * TIME.HOUR
};

export enum IMAGE_MIMES {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    WEBP = 'image/webp',
}

export enum VIDEO_MIMES {
    MPEG = 'video/mpeg',
    MP4 = 'video/mp4',
    WEBM = 'video/webm',
    AVI = 'video/x-msvideo',
}

export type MIME_TYPES = IMAGE_MIMES | VIDEO_MIMES;