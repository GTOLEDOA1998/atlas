import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted select-none",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Derives up to two initials from a display name or email address, so an
 * avatar always has something to render before an image exists.
 */
function getAvatarInitials(value: string | null | undefined): string {
  if (!value) {
    return "?"
  }

  const name = value.includes("@") ? value.split("@")[0] : value
  const parts = name.split(/[\s._-]+/).filter(Boolean)

  if (parts.length === 0) {
    return "?"
  }

  const initials =
    parts.length === 1
      ? parts[0].slice(0, 2)
      : `${parts[0][0]}${parts[parts.length - 1][0]}`

  return initials.toUpperCase()
}

export { Avatar, AvatarImage, AvatarFallback, getAvatarInitials }
