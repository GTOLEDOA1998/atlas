-- =====================================================
-- Atlas Core v1
-- Migration: 0001
-- Description: Initial database schema
-- =====================================================

-- Extensions
create extension if not exists "pgcrypto";

-- =====================================================
-- TABLE: profiles
-- =====================================================

create table public.profiles (

    id uuid primary key default gen_random_uuid(),

    auth_user_id uuid not null unique
        references auth.users(id)
        on delete cascade,

    display_name varchar(80) not null,

    avatar_url text,

    country varchar(80),

    language varchar(10) not null default 'es',

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

create index idx_profiles_auth_user
on public.profiles(auth_user_id);

comment on table public.profiles is
'Represents an Atlas user identity.';

comment on column public.profiles.auth_user_id is
'Reference to Supabase auth.users';

comment on column public.profiles.display_name is
'Public name displayed throughout Atlas';

-- =====================================================
-- TABLE: players
-- =====================================================

create table public.players (

    id uuid primary key default gen_random_uuid(),

    profile_id uuid not null unique
        references public.profiles(id)
        on delete cascade,

    dominant_hand varchar(10),

    playing_style varchar(50),

    current_level varchar(50),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

create index idx_players_profile
on public.players(profile_id);

comment on table public.players is
'Sport profile of an Atlas user.';

-- =====================================================
-- TABLE: videos
-- =====================================================

create table public.videos (

    id uuid primary key default gen_random_uuid(),

    player_id uuid not null
        references public.players(id)
        on delete cascade,

    storage_path text not null,

    duration_seconds integer,

    status varchar(30)
        not null
        default 'UPLOADED'
        check (
            status in (
                'UPLOADED',
                'PROCESSING',
                'ANALYZED',
                'FAILED'
            )
        ),

    uploaded_at timestamptz not null default now()
);

create index idx_videos_player
on public.videos(player_id);

comment on table public.videos is
'Videos uploaded by players.';

-- =====================================================
-- TABLE: analyses
-- =====================================================

create table public.analyses (

    id uuid primary key default gen_random_uuid(),

    video_id uuid not null
        references public.videos(id)
        on delete cascade,

    analysis_version integer not null default 1,

    status varchar(30) not null default 'PENDING',

    summary text,

    created_at timestamptz not null default now(),

    completed_at timestamptz
);

create index idx_analyses_video
on public.analyses(video_id);

comment on table public.analyses is
'Stores an execution of the Atlas analysis engine.';

-- =====================================================
-- TABLE: observations
-- =====================================================

create table public.observations (

    id uuid primary key default gen_random_uuid(),

    analysis_id uuid not null
        references public.analyses(id)
        on delete cascade,

    category varchar(50) not null,

    title varchar(120) not null,

    description text,

    confidence real
        check (
            confidence >= 0
            and confidence <= 1
        ),

    priority varchar(20),

    created_at timestamptz not null default now()
);

create index idx_observations_analysis
on public.observations(analysis_id);

comment on table public.observations is
'Structured observations generated from an analysis.';

-- =====================================================
-- TABLE: recommendations
-- =====================================================

create table public.recommendations (

    id uuid primary key default gen_random_uuid(),

    analysis_id uuid not null
        references public.analyses(id)
        on delete cascade,

    title varchar(120) not null,

    description text,

    priority varchar(20),

    created_at timestamptz not null default now()
);

create index idx_recommendations_analysis
on public.recommendations(analysis_id);

comment on table public.recommendations is
'Recommendations generated from Atlas observations.';