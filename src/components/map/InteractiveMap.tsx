
"use client";

import { useState, useMemo } from 'react';
import type { Crop } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InteractiveMapProps {
  crops: Crop[];
  regions: string[];
}

const difficultyClasses = {
  'Fácil': {
    border: 'border-primary',
    text: 'text-primary',
    dot: 'bg-primary'
  },
  'Media': {
    border: 'border-accent',
    text: 'text-accent',
    dot: 'bg-accent'
  },
  'Difícil': {
    border: 'border-destructive',
    text: 'text-destructive',
    dot: 'bg-destructive'
  },
};

const ColombiaSVG = ({ selectedRegion, onRegionClick, className }: { selectedRegion: string | null, onRegionClick: (region: string) => void, className?: string }) => {
    const regionPaths: { [key: string]: string } = {
        'Andina': "M130 187L121 185.5L110.5 180L103.5 175.5L97.5 168L93.5 158V147.5L98 136L103 122.5L105.5 110L110 94L113.5 82.5L120.5 66.5L127.5 54.5L135 44L138 33L142 24.5L150 20L159.5 18L166 22.5L171 30.5L178 33.5L186.5 40L189 50L194 62L203 69.5L208.5 76.5L202 89L196 96L194.5 110L189.5 125L183.5 137.5L178 148L173.5 157L163 171L159.5 178.5L150 182.5L141.5 185.5L130 187Z",
        'Caribe': "M178 33.5L171 30.5L166 22.5L159.5 18L150 20L142 24.5L138 33L145.5 39.5L154 44.5L163 47.5L173 50.5L181.5 52.5L189 50L194 62L203 69.5L208.5 76.5L214 75L224 71.5L234.5 65.5L245 57.5L255.5 49L265 42.5L271.5 35L273.5 25.5L263.5 20.5L250 17L235 15.5L220.5 17.5L211.5 24L200.5 30L194 36.5L186.5 40L178 33.5Z",
        'Pacífica': "M110 94L105.5 110L103 122.5L98 136L93.5 147.5V158L85.5 156L78 149L72 137.5L68 126L65 115L64.5 102.5L68 90.5L74.5 82L82.5 77L90 77.5L98 81.5L104.5 88L110 94Z",
        'Orinoquía': "M178 148L189.5 150L199.5 150.5L209 154L217.5 161.5L226 169.5L232.5 179.5L235.5 190.5L234.5 201L230.5 209.5L224 216L213.5 221L201 220.5L189 216L175.5 210.5L163.5 204L152 195L141.5 185.5L150 182.5L159.5 178.5L163 171L173.5 157L178 148Z",
        'Amazonía': "M93.5 158L97.5 168L103.5 175.5L110.5 180L121 185.5L130 187L141.5 185.5L152 195L163.5 204L175.5 210.5L189 216L201 220.5L213.5 221L212 231.5L204.5 240L193.5 248.5L181.5 254.5L168.5 259L154.5 260.5L141 259.5L128 255.5L116 249.5L106.5 241L99.5 231L95 220L92.5 208L92 195.5L90.5 182.5V169L93.5 158Z"
    };

    return (
        <svg viewBox="60 10 220 260" className={cn("w-full h-auto drop-shadow-lg", className)}>
            <g>
                {Object.entries(regionPaths).map(([name, pathData]) => (
                    <path
                        key={name}
                        d={pathData}
                        onClick={() => onRegionClick(name)}
                        className={cn(
                            "stroke-white/50 stroke-2 transition-all duration-300 cursor-pointer",
                            selectedRegion === name ? 'fill-primary/70' : 'fill-transparent hover:fill-primary/40'
                        )}
                    />
                ))}
            </g>
        </svg>
    );
};


export function InteractiveMap({ crops, regions }: InteractiveMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>(regions.includes('Andina') ? 'Andina' : regions[0]);
  const userImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFRUXFxcYFRgWGBUVFxcYFhUWFxUWFxUYHSggGBolGxUWITEhJSktLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPUAzgMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQQFBgIDB//EAEIQAAEDAgQEBAIGBgkFAQAAAAEAAhEDIQQSMUEFIlFhBhNxgTKRFCNCobHwFVJigsHhM1NykpOistHxNEOD0uIW/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA0EQACAgECBQIEBAUFAQAAAAAAAQIDEQQhBRIxQVETYRQicYEGMpGxFSNSodFCweHw8WL/2gAMAwEAAhEDEQA/APuChA8q9drIzHUwIBJNp0A7KSG8Hl+kGft/4dT/ANUwyOdC/SFPq73Y8bgWlt9UwyzIT+J0xqXCbCWVLnoOW5TDCkmd08axxAGaTpLHtmxOrgBoD8k3Ckn0JKFjjzB1Hz7x+NlBGTkV2wTmbAsTIgHoTsgyhvrtGrgLxcgXOg9UGROxLBMvaIibi06SgyegKEjUgEBT8T4/SpSG/WPEjK0ixE/GfsiRHXW1iskKnLrshGMpy5YLLZ48N8Rte4MezISQAQQ5snQXggk20O11Eq8bo2rtHbVHml0L4LGjVBSAQAgBACAEAIAQAgBAQseeal/ad/ocpiYrehmeM419Sp5TCC2QIG5PU73Wwlg6+i01VdHrWosK1Cr5WSo9rycrRYjUgczpl3rAKxv2OROcHJuCwioxNZ9FzWZaTgw5gJquiXT8TjqBtpMK2Dd0mktui5ReE9mXfBsa6qGF5BIqEWsY8lxkj3KpZjsY9Rp1RbyRL8rGYymbwSDPmaEEW3Di+87ZnE/Losvq+xrKh+T2pcLytADgTmB5gXAwzLBE9SXeqo55ZZVYWDzPBpJJeTNyIgTpFo5cvLHRT6nsR6Lz1OaXBi0g+ZoRs8aNLdn2sdul5R2JrAjU085LgLEbAEqQUuM8SUmSGgvPazZ/tHUdwCsiqb6mzVo7rN0tvcydes6o8n7TjoO5FgPUge4WVvbB3aq69PWlJ9O5acK8PvefrWuZTIM6BxmIEatsTMgG2yo5pLY0NZr4yjyV7+TZBYUcgakAgBACAEAIAQAgBACAgcVjkJMQXX/8blaHUq1lpe5h8MDnGXXMI9cwj74Wbvk9Rq+X4d83TBs8YPh/tt/1BY2zx8e5lOJU3ec8G5na+uiyPyet0koR08WtlgveBYE0wwuEOc/3yik+Afck+6xTZxNZqY3XZi9kaJUNcEAkB41cUxpDXPa0nQFwBPoCmG+hOMkbjGPNGnmABJMCdNCZ76KYR5jJRS7ZqCKdniuwmkO8OOvYFv8AFZPSXk3Xwu3s0V/E+OvrcoGRvQGZ9TAn0VoxUeht6bhqh81m7INDDueTlE9SbC+kkqk7ox6s3rLoVr5ng13hvh/l08zhD33Otm/ZEHTr7xsFRvJ57V3+tZldF0LhQaoIAQAgBACAEAIAQAgBQAUghcSaDkB0JI/yOUwKSk4tNGW4HhQ6vOzZd7g8v33/AHVsSO3xPUONCj3ZpMU0nLlEnMDFhOW5F/RYZbHnK98lccDiQ4vaGZj9pzGk+kipEbWuVV2exnc7HBQeceCbgqeIzg1cpaCCIAaRyvBnmMzI9LqHLPYiEWn0LZDKCAqOO8YFAQ0S8i3QDSe99laEM7vobOl0sr5YXTuYzE4l73ZnuJJ3P8rLPnsj0VOnhVHlijzzWA2Gg2HoNlGS0KK4PMUkCIynrhqBe4NbqfzKw3WqqDlIx22KuLkzZ8IwbW6XDJANrvPxun/L/eC52jcrM3S79PoeY1NrsnllsAt4wHOcdUAZx1UgeYdUBz5g6hQBlw6oAFQdRfTupAvNHUdNd+iA5GJbe4GU5TNrwHRJ1sRooB15reo0nUadfRSBioJiRMTG8dY6IDpACAgcWDsoy6y6P8N6tXjO5C5eZc3TJA4DgyxhLgQ5xmDqALAH7z7rJJk8R1Cut+XotkWQHMz1P+lypPoa1PUmKhsggBAIqGDCeIQ7zn5yCZ0bsIGUesR7lbMX8qwdzhGfTefJnq2Nc17hklos02EnKwnmzftEXAvFzcjG5b4NueplCTTWwv0jcw3SN73Hw9n8wlu2V+sJzj4rwibRfmuRBkg73a4tMHpIV4vKybMXmOTTcEwwbSNQXe6zbaEmAPmQuBrrZWXqnscbX3Ny5OyNRSphoAGgEDU/Mm59V1oxSWEcg7VgYfj3g+rWrYiqwUj52UQ7IDDRhdXmk4kHyagyOzNu0xqFGAeR8I4jNytoXp5S92TzGtGHFIYdvl0GgU/Mb5ktytmo/k0KA4xHgzEOALPIpPY4uD2uefOeKWLaK1YBg5nmuwOF7F/MYCAMb4MrPp1mBlEue8Oa4vZ0qi4OGdP9IJD/ADBYxlMEAWPiHw1Wr1S5goHNTLfMf8bPqK1IsaMjiGONWZDmkS7XQgRaXhOv9Xy0WR5Yzh+apQ8qu6sTRyUKbSagcGGzIDROfRARx4IrubB8imG/CymGlr8raDTmd5Ic3OKRlwl7LQ86ICZQ8IVjVDqtVha7EHEvDWjMHup12Fg8xrg9uV9FuaGmKexQHFLwlXDalOMMfMY1hqkPNRrHUqFGrSaIHJlpPcOYSXgQILiBL4J4br0cTSqPNItp0vKLgXF7w2WU+RzDkOXKS5rxu0tdZykGtQAoBHxdIujLEgzckatI1APVSmUlHJU/oivEfSam98zZggD+r7a66q3MV9MmYDBVGRnqF8OLpcQXCWkBoysaIuocslowwWSguCAEBDx3EaVETUeBaYgudHUNaCSPZTGEpdESouXRGK4xXa6q4scXNJkEiPXUDTT2WwumD0XDoSjTiSx1KutVcCYDjpAa0uBBFzI3B2nTa8jFJmS2yUW8L7YI7K9URFEgEHlANjIAvAExeN9AqKWDGrZwW0ftuTqRJAJEGBIvY7jqsiextwk3FNmz4ZhAGtpjQQ6obamDlg7m3t3hcOqD1God0lsuh5zVXOc2y7C6yNQakAgBACAEAIAQAgBACAEAIAQAgBACgApApUZBFx+PZRbmefQDU+gVoxcnsXhXKx8sVlmG4jjDVqOed9Ow2HyWfGFg9JpNP6NaXfuQ1CNw6BR4Iwd0mSQAJJ0WOc1FZbKSkorLLLg2EBrFrxdsmO4IXN4hqXGjMH1NPV2tU5h3NIcPqcztcwvYHl0Gn2Rr1PVcOrX21pRXRHDcUyZgahIIJktOUmwmwIkDeCOnovR6W71q1MwtYZJWwQCAEAIAQAgBACAEAIAQAgBACACkEAIBFQwZ6hxV1N721nQC5wzW+r1I0F2xGukid441HE5fFy01qw8/KbU9PmtTh9yh4uxzarmue58aFxJMai5Xoc7I6/DlB0qSWGQCoydEEzsDoKuSGaTgnDcgFR05oNjtfX1heZ4nxDnzVHp5OPq9TztwXQsMLg2sLnaucSSfXb0XNu1UrIRgnhI1bLpTSj2RKK11zZ6mI4zFhzg20cJOg+0OhEn130C6/DdVKE/Te6ZjnHJZBeiRhBSAQAgBACAEAIAQAgBACAEIBCQQAgPKpiGhwaXAOd8IJuY6DdVcknhsYbMl4nr53kAAZeQmQc0ibjaJ07mVwL9RXLidccbxfXzsdjh9OYPL6op6rgYgAAAAASRDWho1JOg6r07nk6Gl06ohyJhQoOfZrSfQSsFl0a95MzWWRhvJl07w8YtUE9x81yP41DO6OeuI+YnthuA5XBznzF4AWC7i/PBxijHZr+aLSjguguF87OfsNR83hASfVA5qNzQ39YwZ6QSbegK3+HVxnesroUnsixC9aYBqQCAEAIAQAgBACAEAIAQAgBACACoBm/EOc1BIIaAMt9TqTI0OnyndeW/EFl0Jwcdo+V5+v0OhoVB5T6/7FQ6mIiIHQLy8bZKfPnfrk6kXy9DxpYGYAPsvQw/ElsYYlFN+TLK/CNPgME2k2AL7ncqmo1dmo3l+hxrrpWSyyTC18mIcJn2/uQKFGfYDCnCfYAESQPOs0kcpIcLg9/wAystN86Zc9fX3Iayd4LiAhwqOaHNJmYAgk5Te2lvZek4drlqaeeWE1s14MEo4ZJbjaRE+YyL3zN2md+x+RXQU0+jKnNXH0mmC8TawvrEExoL6qk764fnkl9WMHtQrteJa4OHY+/wDFZFJNZQPRWAIAQAgBACAEAIAQAgBACAhcTwnmMgG4uBoCYNjZams0sdTTKqTxktCbhJSXYy9ekWOLXai1rhfPdXpp6e11S6o7tNnqw5kd8PcBUbPVYq18y+ovT9N4NBmXW5JHLwOU9NgYKrheCBKv2A1KkgEqedIBKlPPcEXF0WxMaLR1NCjFyg/qiepEsde2y5qlNdH/AHGzEwNFhb0t6pKUpbyeQsHFWm0m4E9YuLgyHagyAfUBZ6NVfS8wk1j32/QhpF1wzG5xld8bdbQCNnD+I29wvofDNfHWUqX+pdV7mvKOGT10yoIBSoyBqQCAEAIAQAgBRkApAnKCGY3F0XNcWuMkEyes3m3rPuvAcaVi1knPv0x4OzoHH0Ul2/cjxBBXL7G72L/AVszZOui3qLcxw+qOXdDllsSgtnmRhIvEzVDPqbvzDcNtvzFrg31ylbWl9Pn/AJj2KyyVQ4riBla5gBdIbLXBzyANGzAMHPNwJym4k73wtDXMpbfYrlk3h2IxDnAVGAN3OUtMnM7c6NjJpzWdMG+tfXQo/I9/+/8ApKyWkLQwywQmJeBkh4t0xB9VzNZYmkkWwRsq0MgAFIwBCEAJBDmmHDQx8wRuD0/ktzQ62ekuVkfuvKKuOUSHcQrOj4WRsOefUkC3ovRXfijp6UPrn/gxqoZx9a3MzvDD/F35lYpfimzC5a1+pPpI8X1KjrOquI6DK24jdoBi2k7nstK78RayyPKsR+i3/uSq0TOCudLxLi20Sc0OvIvfQt3jsN/R8B1F99Lldl77NmOaSZbLvlAQAgOXOgSoIbKscVOpyAAZicxgiGnK07uGb8Otr8iMXq4Of0q4ADKCSPbMTyMkSNJ3nRSoIiVrXY98HxHzHCAIMxrmiA5r46EED1KiUcFoWORNqk5TlALoMA2E7SqGR9DJ4vEOqOzOidLbRtqfxXgeM6md2ocZrHLsdjRQiq+aL6kJtdr/AIXNdGuUgwellzZ0zr/Oms77m5CSabTLXg9Tmc0Hafks2mUlL2NTVJYTLZbnM/KNMj8Qp1HUy2mYcYGaYyiRmIN7xMW1hbOmcFNOxLBV+xXD6YYzCJzEhpZDTmdlaTMluUNMiTJ6aby+DSeCnzHvgPpWdoqgFuTmIyfGYMQL2uOkRusF8dN6ea/zZ6exKyWq0kvYscvdAkqspqC5nkFc90knuuBZLmk5eSyIXEq1RrR5YlxcBoDaCbSQJtF1taGuqduLnhY84KybS2K79N1I/oTN73hxGmVsSJ1AdBghdb+D0N5Vu322+rz/AH8lPUeOhIocQqEGaRs0usTJMEhkZdoyz12WtqNBp4NKNnVrxss4b6/f6EqR6cMxz6jntfTLQ0mHfZcJsRN4jci+UrHxDRU0QjKuec9vG3sIybLFckuJCAdYLJVXK2ahFbvYF1w6iWsAdYy4mL6uJ1919Q0FD0+nhU+qRryeXklLcKggBAcvdAJ6KEQ3sU1PiFTR9Nrbaltml2XWCRYFxN7iNLrJyryYfUeeh6NxlSTlALRF8sAl0ARzAgTPVOVYHO99jqnjXnL8F4sGuvJbLAZ1bJJP3C6jlRbmZaKhlMbjmNpvfBs1ziZJMTzfgQfdeE45CXxssrrjHbOx1dA4qjC7ZM/9AYfhqEQ0gh5c0g2bfNdgsLREOdA5lf4y6Pyzh46b7e2Ns/cz8kGspljwfh1J7HB9VtoDrBonLOUF2rQL5YsQDaFu16q7qq9u2/X647+5pXpZSya2kBAIMggQZme8rnSXzPKMeT0ARJeANV2IBEvcHD6gG6pZdGtPMhggvJNySVxbLpzfzMseZb6qmQQMZUrNqNDGlzSaYNrAF5zmRoQ2De3LGpE9LTVaedEnOWJLOPfZY/uY3lMjVPPzggEw505mjlEujy3CDdsSTO28xtwjpPTxKWM+G99v9Sfh9FsRl+BVcZiWtcSwWa8zldHL8JgO+1pG2ulkhpNBPCVnX3X6dPv79PcZl1werMRiMw+rtNMGZ3jzDrqCXdiG+kxbpdDGpuNmZJPG/Xx28fuOaWehaQuGXwBamSMCqMkRMEwAehJgbjchb3DouWqrS8oPozShfUEjWGpAIAQCUAjYjHU2GHOjTY76XA1UpMhtI8zxWj+v9zv9k5WRzIk4eu14lpkaaEfj6qCep1WeGguOgBJ9rowzHcRrCo55iA620xEfNeB4tq1dqueDylhL7f7Ha0lHJXh9WVzuHsLpEtgQA3KAJ1IEamStda6xRw9875ef8md1RLuhwVgAu9pyBhhw0sYuOoB9vUHqU8StjBZijmWRUpN5LHCUhTY1jZhogTrAWtZZ6k3N9yOXB7Byqn7jA8ysmsdSMCqVgBJWOy1QjltDlK99QkklcOybnJyZbAs6pgYFmTAwIuU4GBZ1OBg4qVw0SYA3Jt96tGtyfLHdlJNR3k9itqeIqQMAF3cafeu9R+GNfdHm5Uvq8HLs4xpYPGc/Q92cZpugMlzjo0a95mwC158B1lTfqx5YrrJ9DLHiVE0vTeW+3ckUazg2auUHtMAbCStC+urn5aG2seO/0NmqU+XNuEznFY4U2GoCLQQZtMiJvpK2eFwujq4emvmz38dybbYRhlvY1zSvpKMQ1YAgBACggqcaym6oW1Ax3wkBwBvBEgHe/wB6yQWUYLG87Fc+kx73hlGnLYOYsaQXXzB3W0ff2WRRSLuPLFSk+pd8OYGhwaA0B1gBAHK3ZYZdS0HsSntkQdDqqlmZPiuAFJ4yvBBklsDMBENGbp0kbFeW45o9PVWpxWG3sku/dm9obLXPlzle/wCxGw1PM8AdV5bDeEjrWS5YbmgXW2wcoYKfdkDhTh+Qc1amUTCxXW+nHmIID6uYyVx7LJWSzINnJcseCciLimCOY5lWGTqbKCc7HlWqhoLiYAEkq9dcpyUYrLexSyxQi5S6IyXEsa6q6TIb9kf7919V4JwOrRVqcsOb6vx7I8Vr9fPUT2eI9kRJ7L0ODnHthMa6kSWxJESRO8272WjxDhsNdX6djeM52fU2NNqZaeXPDGTmtiHPu9xPqfwGgUaThWl0ixVWvr1f6i7VXXbzlk8w46f8Ld9CvPNyrPnBhU5Yxk+g+DuNCqwUSCHU2NEzOYC09oGXXquVfS65Hq9Dq43wwuq6mlWE3wQAgBQCl4vwl9V4c0sEARma11/RzTG2hUqTXQpKOT2wuErNnM5r5M7Njr8Lb7fJSrH3RT0iZhaZbmzRd02JP2QNSB0VW8mWKwsHHEMYKTZJEmQ0Hd0E/wAJ9ljttjVB2T2S6kxi5SUV1ZkqtQuJcTJJk66r57r9bPV288vovZHeopVUeVfcn8IoC7t9Fj08XKXN4MWqn/pLNbnzeTUBFzAFZSywUlPigfUq0nHKWu+r0vHKR3M3W/xThUo6ON0F7s5Wn4hGy6VUtmnsRuOZxTzMcRlMmLW0/EhczgENPbq1XqI5Uk19yOLTtrp563jB3wrHea39oQD8tfxU8c4Q+H3bPMZdP8FuHa9aqvdbrqS1xDoDKFjzqVQ3UgepAV4Vym8RWfoUlOMVuyi4xxAPHlsMjVx2MXAHX/he2/DfA7Y2fE3rGOif7nm+LcQjOPpVvPllMQvfpvweeFCnPsQKFbbwSJEkRsdR3TbyWNf4P4E/O2u+WgfCLgukb/s/zXL1d6k+Vb4PQ8M0c6/5kn17G2C0kdoakAgBACARUAzuJ8RP8wtp0SWDV7jGbqGt19CfXRauq1+k0sP5lmZf0rdr6lKo322YjB8v9T2X2ImNxr6pvAA+EDbvJ1Mfnr5TivGVqY+lUsR8939vB19NpHW+eb3/AGIw2XnzeZpGNtouxXCSikkjkye51Cs4y8EZOSFGPYnJzUeACToASfQXKtCPNLlS3IlJRWWYbj7A3EOLTZ2V47Fwn8br3nDP52k5LF7HieJpVapzj3wy1r1s+Hc6IlhPpZfO/h3peJqtPpNHorLVdonN90ZvD1C0yHFt7xc/Lf3X1LWaOvVVclkVLxnz9Tx+nvnTPmjJom4rir3OBZAgECYJvudpXntD+FK4Qkr3vLsuy8ZOpqOMWSmnXtggOrPNy4k+pXfp4No60lGqO3sc+Ws1E3lzf6nk4dVuwohD8sUvoYJSlL8zyKFl5X4KgpwvBG3gFGwyCDI8qnfyQK6Sg5Rw2XjOUJKSNl4W8SuL/ACq7pk8lQwLnRjut9D3A7rl6nSen80eh6Th/EvVfJZ+bz5NkCtJHZGpAIAQAgIfFRNJ7Q4BzmuDbgEkiwEqYNKSbMVycoNR6mOpEgAHUAA2i4F7HS6+ba9L4mxpY+Z/uei0sf5EM77IkU6TnAlt42tK1VW2spGSUoxeGSeG0pOZ2g07lXpq55Z7IxXzwuVFsai6WPY0eU5NVTheH+pPKLzVZJN4SZDSSyUGP4811KuA5pvkpibuBADnenxGV6PS8Kcbanh77s4Op4lB1WJNeEZWrWc4y4lxtrrYQPwXsK6o1rEdjy1knN5k8kp3E3GkKeu0/siIauC/w/B8Q+Lzt1x/9G+9fL4b0e/n2IWdejwzm4Br0w/BPKGZS/oV5RZlCa8E4QZ1ZOJPKhZlOUQkPMoz7k8o8xVtyOVCnsowyOXLJDsJUBYMhmoAafR8mBl63/EdQsPrxab8dTYeitTS5Xv0LTE+H6lHDGu+zgW8sAwHGJcL7lv3ytb4lWz5EtmdD+HOir1n+ZdjecFx3nUWVLS4c0aBws4a2gyudKPK2j0NU1OCku5OUGQEAIBIDPeIsE8uz/E2Igaj23FzfuvP8co1E4Kdb2j1S6/U3NFZCMnGS69ypweELzawH5svIpTtflnWstjWsFvhcOGCJm/otuqiUM5NGyxzeT3AWZQZjOlblfXcgj43FsptLnmB7SewG5Wxp9PZdNQgmYb74UQcpvYyPFuPPrDKG5GbiZLvU9Oy9lw7g0NO+ex8zPKa7i8r1yQ+VfuU5K7yaOPkZTAOTfRMFWBamGSsiUqLJ+gwU/UIRU5WA+gSpTXkHUBM+4Nj4I4fSqU3ufTa4h8DMJtlEjSCuVq5yU8JnouF0wlTzNLOTQf8A5/C/1Ld+u89+/wCHQRrerPyzofC0/wBC/QR8OYU/9lv+Yde/f7h0ET6tn9TI+Do/oX6Eujw2kwNa1gAYS5u+UkyYnTXRUyzMoLx0PetSDmlrgC0ggg3BB1BChPDyS1lYZmvBlbK6vh80inUdkNzYOLXCZtBaLWuTrdbF66S8o09FJLmr/pf9jUrAbwIBIBoBEKGgV1bh+X+igD9TQfun7J06i20krl6jhdM94LD9jLG6S6kQ1I1Dm3AuHC50E6H2K489BZFNtbI2FZFs6a8LSUUXaZmeNcYqU8QQx3KyOU2aSW3mIJ1XruG8Jou0uZrDfc8truJ3Vanli9l2KTH4t9Z5e+J0AEwB0AK7uk0Vemr5IHG1WqnqZ8839iPC3E2a4gpWRuIp9gJTj2IOajZBA1IIG1yLKso7PBeuSjNSfYjVmVRMXG2k3JP6sDbbY9VrenZHbJ0fWoseZLfy+g/JqzdwiRMdJ0iOkq8Yz8mKd1LWMf8Af1BlKpmkuGWTaZOloEfd21SKs5s5InbU68KO/YkkLYTZpAG9FbfwCbgeJV6VqVVzAZsA0g21gg7fKPVattEJPmkbun1l9a5K/wBjX+DeM1az306z8xjM0kAEXAcOUAEXG2XXbQ1NKra5ejO5oNVO5S9Rbo1gWudEEAioYPCjgqbHOc1jQ5xJcQLknWT63UttlVCKeUiQhYUIBoAQAgEVDBzUphwIIkGxBUNJ7MFNXwddrTka1zgOWXG5tGaRrrvtrdcf+FJ25b+XJlnfJQfKtzHHgWLe8F9JwzO5nGDcm5MTa/5gr1ULqqq+WHY8rLQaiyzM11e7O+N+HqmHAcSHs0zC0Hu3ZZKdSrHytbldXw6VK5o7op8q2cexzO3Q5DU2IwJwRNeQJW28ks8cXRLgIdBBmRY6EWPuq2KUl8rM+ntjXL5llHhVwbiSc5BLctraCxkEGzsx/eVHVNvOTNHVQjHHKN2GfLvrCAdLutrEGe49Y7qjqt8l/iae8P2/wD8I79c/FO5ERGXVHTPyQtVDO8P2/wEAZlOQGZVchg2UAuozIGqEAlRkGoQBKEAlQgpQBSgCUAZlAyBqEAgBAD//Z";

  const cropsInRegion = useMemo(() => {
    return crops.filter(crop => crop.region === selectedRegion);
  }, [crops, selectedRegion]);

  const handleRegionClick = (region: string) => {
    if (regions.includes(region)) {
        setSelectedRegion(region);
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold font-headline text-primary">Mapa Interactivo de Cultivos</h2>
          <p className="text-muted-foreground mt-2">Explora los cultivos ideales por región y su nivel de dificultad.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative w-full max-w-[450px] mx-auto aspect-[450/465]">
                    <img 
                        src={userImage}
                        alt="Mapa de Colombia"
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                    <ColombiaSVG 
                        selectedRegion={selectedRegion} 
                        onRegionClick={handleRegionClick} 
                        className="relative z-10"
                    />
                </div>
                 <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {regions.map(region => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
            </div>
            
            <div className="mt-8 md:mt-0">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Cultivos en la región {selectedRegion}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {cropsInRegion.length > 0 ? (
                        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
                            {cropsInRegion.map(crop => (
                            <Link href={`/cultivos/${crop.id}`} key={crop.id} className="block group">
                                <div className={cn(
                                    "p-3 rounded-lg border-l-4 group-hover:bg-accent/50 transition-colors flex items-center justify-between",
                                    difficultyClasses[crop.dificultad].border
                                )}>
                                    <span className="font-semibold text-card-foreground">{crop.nombre}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("text-xs font-medium", difficultyClasses[crop.dificultad].text)}>{crop.dificultad}</span>
                                        <span className={cn("h-3 w-3 rounded-full", difficultyClasses[crop.dificultad].dot)}></span>
                                    </div>
                                </div>
                            </Link>
                            ))}
                        </div>
                        ) : (
                        <p className="text-muted-foreground text-center py-8">No hay cultivos para esta región.</p>
                        )}
                    </CardContent>
                </Card>
                <div className="mt-4 flex justify-center items-center gap-6 text-sm p-3 bg-card rounded-lg border">
                    <h4 className="font-semibold">Leyenda:</h4>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-primary"></span>
                        <span>Fácil</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-accent"></span>
                        <span>Media</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-destructive"></span>
                        <span>Difícil</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
