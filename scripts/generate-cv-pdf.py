"""Generate the two one-page CV PDFs from public/cv.md.

The Markdown remains the content source of truth. This script only controls the
print layout so the PDFs cannot silently keep older claims.
"""

from __future__ import annotations

import html
import re
from dataclasses import dataclass
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "cv.md"
PORTRAIT = ROOT / "public" / "brand" / "jonas-avatar.jpg"


@dataclass
class CvData:
    title: str
    subtitle: str
    contact: str
    availability: str
    profile: str
    sections: dict[str, list[tuple[str, list[str]]]]


def clean(text: str) -> str:
    return (
        text.strip()
        .replace("–", "-")
        .replace("—", "-")
        .replace("‑", "-")
        .replace("·", " | ")
    )


def rich(text: str) -> str:
    escaped = html.escape(clean(text))
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped)


def contact_rich(text: str) -> str:
    escaped = html.escape(clean(text))
    links = {
        "jonas.suhard@gmail.com": "mailto:jonas.suhard@gmail.com",
        "jonassuhard.com": "https://jonassuhard.com",
        "github.com/Jonassuhard": "https://github.com/Jonassuhard",
        "LinkedIn (Jonas Suhard)": "https://www.linkedin.com/in/jonas-suhard-b73923245/",
    }
    pattern = re.compile("|".join(re.escape(label) for label in links))
    return pattern.sub(
        lambda match: f'<a href="{links[match.group(0)]}">{match.group(0)}</a>',
        escaped,
    )


def parse_cv() -> CvData:
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    title = clean(next(line for line in lines if line.startswith("**")).strip("*"))
    title_index = next(index for index, line in enumerate(lines) if line.startswith("**"))
    subtitle = clean(lines[title_index + 2])
    contact = clean(next(line for line in lines if line.startswith("Contact :")))
    availability = clean(next(line for line in lines if line.startswith("Disponible en CDI")))

    profile_start = lines.index("## Profil") + 1
    experience_start = next(index for index in range(profile_start, len(lines)) if lines[index].startswith("## "))
    profile = clean(" ".join(line for line in lines[profile_start:experience_start] if line.strip()))

    sections: dict[str, list[tuple[str, list[str]]]] = {}
    current_section = ""
    current_heading = ""
    current_bullets: list[str] = []

    def flush() -> None:
        nonlocal current_heading, current_bullets
        if current_section and current_heading:
            sections.setdefault(current_section, []).append((current_heading, current_bullets))
        current_heading = ""
        current_bullets = []

    for line in lines[experience_start:]:
        if line.startswith("## "):
            flush()
            current_section = clean(line[3:])
            sections.setdefault(current_section, [])
        elif line.startswith("### "):
            flush()
            current_heading = clean(line[4:])
        elif line.startswith("- "):
            item = clean(line[2:])
            if current_section in {"Formations", "Compétences"}:
                sections[current_section].append((item, []))
            else:
                current_bullets.append(item)
    flush()

    return CvData(title, subtitle, contact, availability, profile, sections)


def register_fonts() -> None:
    regular = Path("C:/Windows/Fonts/arial.ttf")
    bold = Path("C:/Windows/Fonts/arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("CvSans", str(regular)))
        pdfmetrics.registerFont(TTFont("CvSansBold", str(bold)))


def make_styles(styled: bool) -> dict[str, ParagraphStyle]:
    sans = "CvSans" if "CvSans" in pdfmetrics.getRegisteredFontNames() else "Helvetica"
    sans_bold = "CvSansBold" if "CvSansBold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold"
    body_font = "Courier" if styled else sans
    body_bold = "Courier-Bold" if styled else sans_bold
    ink = colors.HexColor("#17130f")
    rust = colors.HexColor("#9a4d2e")
    muted = colors.HexColor("#5f5746")

    return {
        "name": ParagraphStyle(
            "name", fontName="Times-Bold" if styled else sans_bold, fontSize=27 if styled else 25,
            leading=30, textColor=ink, spaceAfter=5
        ),
        "title": ParagraphStyle(
            "title", fontName=body_bold, fontSize=9.8, leading=12, textColor=rust,
            spaceAfter=6, uppercase=True
        ),
        "intro": ParagraphStyle(
            "intro", fontName="Times-Italic" if styled else sans, fontSize=9, leading=11.5,
            textColor=colors.HexColor("#3a332b"), spaceAfter=6
        ),
        "contact": ParagraphStyle(
            "contact", fontName=body_font, fontSize=7.7, leading=10,
            textColor=muted, spaceAfter=7
        ),
        "profile": ParagraphStyle(
            "profile", fontName=body_font, fontSize=8.3, leading=11,
            textColor=colors.HexColor("#3a332b"), borderColor=rust if styled else colors.transparent,
            borderWidth=0, borderPadding=(6, 7, 6, 9), leftIndent=0, spaceAfter=8,
            backColor=colors.Color(1, 1, 1, alpha=0.20) if styled else None
        ),
        "section": ParagraphStyle(
            "section", fontName="Times-Bold" if styled else sans_bold, fontSize=12,
            leading=14, textColor=rust, spaceBefore=9, spaceAfter=5, uppercase=True,
            borderColor=colors.HexColor("#b9b0a0"), borderWidth=0, borderPadding=(0, 0, 2, 0)
        ),
        "heading": ParagraphStyle(
            "heading", fontName=body_bold, fontSize=9,
            leading=12, textColor=ink, spaceBefore=6, spaceAfter=3
        ),
        "bullet": ParagraphStyle(
            "bullet", fontName=body_font, fontSize=9, leading=12.5,
            textColor=colors.HexColor("#3a332b"), leftIndent=7, firstLineIndent=-5,
            bulletIndent=0, spaceAfter=.9
        ),
        "row": ParagraphStyle(
            "row", fontName=body_font, fontSize=8.8, leading=12,
            textColor=colors.HexColor("#3a332b"), spaceAfter=0
        ),
    }


def page_background(canvas, doc, styled: bool) -> None:
    width, height = A4
    canvas.saveState()
    if styled:
        canvas.setFillColor(colors.HexColor("#eee8d8"))
        canvas.rect(0, 0, width, height, fill=1, stroke=0)
        canvas.setStrokeColor(colors.HexColor("#ded6c3"))
        canvas.setLineWidth(.25)
        step = 24
        for x in range(0, int(width) + step, step):
            canvas.line(x, 0, x, height)
        for y in range(0, int(height) + step, step):
            canvas.line(0, y, width, y)
        canvas.setFillAlpha(.05)
        for name, x, y, size in (
            ("01-gears.webp", -28 * mm, 18 * mm, 135 * mm),
            ("01-gears.webp", width - 62 * mm, height - 64 * mm, 90 * mm),
            ("02-gauge.webp", width - 66 * mm, 120 * mm, 95 * mm),
        ):
            canvas.drawImage(ImageReader(str(ROOT / "public/assets/blueprint" / name)),
                             x, y, width=size, height=size, mask="auto",
                             preserveAspectRatio=True)
    canvas.restoreState()


def build_pdf(data: CvData, destination: Path, styled: bool) -> None:
    top = 11 * mm
    bottom = 12 * mm
    side = 11 * mm
    doc = BaseDocTemplate(
        str(destination), pagesize=A4, leftMargin=side, rightMargin=side,
        topMargin=top, bottomMargin=bottom, title=f"CV - Jonas Suhard - {data.title}",
        author="Jonas Suhard"
    )
    frame = Frame(side, bottom, A4[0] - 2 * side, A4[1] - top - bottom, id="cv")
    doc.addPageTemplates(PageTemplate(id="cv", frames=[frame], onPage=lambda c, d: page_background(c, d, styled)))
    styles = make_styles(styled)

    header_text = [
        Paragraph("JONAS SUHARD", styles["name"]),
        Paragraph(html.escape(data.title.upper()), styles["title"]),
        Paragraph(html.escape(data.subtitle), styles["intro"]),
        Paragraph(contact_rich(data.contact), styles["contact"]),
        Paragraph(html.escape(data.availability), styles["contact"]),
    ]
    if styled and PORTRAIT.exists():
        portrait = ImageReader(str(PORTRAIT))
        pw, ph = portrait.getSize()
        logo = Image(str(PORTRAIT), width=28 * mm, height=28 * mm * ph / pw)
        logo_box = Table([[logo]], colWidths=[30 * mm])
        logo_box.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        header = Table([[header_text, logo_box]], colWidths=[A4[0] - 2 * side - 32 * mm, 32 * mm])
        header.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        story = [header, Spacer(1, 4)]
    else:
        story = header_text

    story.extend([
        Paragraph(html.escape(data.profile), styles["profile"]),
    ])

    for section in ("Projets", "Expériences"):
        story.append(Paragraph(section.upper(), styles["section"]))
        for heading, bullets in data.sections.get(section, []):
            label = html.escape(heading)
            project_paths = {"Job Radar": "job-radar", "Cortex Bridge": "cortex-bridge",
                             "Les Petites Griffes": "les-petites-griffes"}
            for name, slug in project_paths.items():
                if section == "Projets" and heading.startswith(name):
                    label = f'<a href="https://jonassuhard.com/projets/{slug}">{label}</a>'
            story.append(Paragraph(label, styles["heading"]))
            for bullet in bullets:
                story.append(Paragraph(f"- {html.escape(bullet)}", styles["bullet"]))

    for section in ("Compétences", "Formations"):
        story.append(Paragraph(html.escape(section.upper()), styles["section"]))
        rows = []
        for heading, _ in data.sections.get(section, []):
            rows.append([Paragraph(rich(heading), styles["row"])])
        table = Table(rows, colWidths=[A4[0] - 2 * side])
        table.setStyle(TableStyle([
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 1.2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2),
            ("LINEBELOW", (0, 0), (-1, -2), .25, colors.HexColor("#d0c7b6")),
        ]))
        story.append(table)

    doc.build(story)
    if doc.page != 1:
        raise ValueError(f"{destination.name}: expected one page, got {doc.page}")


def main() -> None:
    register_fonts()
    data = parse_cv()
    build_pdf(data, ROOT / "public" / "cv.pdf", styled=False)
    build_pdf(data, ROOT / "public" / "cv-portfolio.pdf", styled=True)
    print("generated public/cv.pdf and public/cv-portfolio.pdf from public/cv.md")


if __name__ == "__main__":
    main()
